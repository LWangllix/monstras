import { useEffect, useState } from "react";
import RouterError, { isRouterError } from "../RouterError";

export default function useServerRouter<Result, Params>(serverRouter: (params: Params) => Promise<Result | RouterError>, params: Params, refresh: Array<any> = []): {
    data: Result,
    error: any,
    loading: boolean,
    reload: () => void
} {
    const [data, setData] = useState<Result>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const reload = () => {
        setLoading(true);
        serverRouter(params).then((res) => {
            const error = isRouterError(res);
            const errs = {};
            setLoading(false);
            if (error) {
                error.errors.forEach((e) => {
                    errs[e.key] = e.msgs[0];
                });
                return setError(errs);
            };

            setData(res as Result);

        }).catch((err) => {
            setError(err);
            setLoading(false);
        });
    };
    useEffect(() => {
        reload();
    }, []);
    return { reload, data, loading, error };
}

