import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { isRouterError } from '../../RouterError';

import { FormikProps } from 'formik';
import { isString } from 'lodash';
import { useRouter } from 'next/router';

export interface RouterFormikProps<T> extends FormikProps<T> {
    connectField: (name: string) => {
        name: string,
        value: any,
        error: any,
        onChange: (e: InputEvent) => void,
    }
}


export function RouterFormik<Type>(props: {
    id?: string;
    newId?: string;
    defaultValues: Type;
    onSubmit: () => any | string,
    getValue: ({ id: string }) => Promise<Type>;
    save: (values: any) => Promise<any>;

    onError?: ({ status: number, error: any, type: string }) => void,
    children: (props: RouterFormikProps<Type>) => React.ReactElement;
}) {
    const newId = props.newId || "naujas";
    const router = useRouter();
    const id = props.id || newId;
    const [value, setValue] = React.useState<Type>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<any>();
    const onError = props.onError || (() => { });
    const handleChange = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        setValue({ ...value, [target.name]: target.value });
    };
    useEffect(() => {
        if (id !== newId) {
            setLoading(true);
            props.getValue({ id: props.id }).then((res) => {
                const error = isRouterError(res);
                const errs = {};
                if (error) {
                    error.errors.forEach((e) => {
                        errs[e.key] = e.msgs[0];
                    });
                    onError({ status: error.status, error: errs, type: "loading" });
                    return setError(errs);
                };
                setValue(res);
                setLoading(false);
            }).catch((err) => {
                setError(err);
                onError({ status: 409, error: err, type: "loading" });
                setLoading(false);
            });
        } else {
            setLoading(false);
            setValue(props.defaultValues);
        }
    }, [props.id]);
    if (loading) {
        return <div></div>;
    }
    return <>
        <Formik
            initialValues={value}
            onSubmit={() => {
                return;
            }}
        >
            {fProps => props.children({
                ...fProps, submitForm: () => {

                    return Promise.resolve();
                },
                handleSubmit: (e) => {
                    const saveValue = id === newId ? value : { ...value, id };
                    props.save(saveValue).then(res => {
                        const errs = {};
                        const error = isRouterError(res);
                        if (error) {
                            error.errors.forEach((e) => {
                                errs[e.key] = e.msgs[0];
                            });
                            setError(errs);
                            onError({ status: error.status, error: errs, type: "submit" });
                        } else {
                            isString(props.onSubmit) ? router.push(props.onSubmit) : props.onSubmit();
                        }
                    }).catch(err => {
                        onError({ status: 500, error: err, type: "submit" });
                    });
                    e.preventDefault();
                    return false;
                },
                connectField: (name) => {
                    return {
                        name,
                        value: value && value[name],
                        error: error && error[name],
                        onChange: (e: InputEvent) => handleChange(e)
                    };
                }
            })}
        </Formik>
    </>;
}
