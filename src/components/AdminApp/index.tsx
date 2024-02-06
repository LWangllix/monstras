import * as React from "react";
import jsonServerProvider from 'ra-data-json-server';
import { Admin } from 'react-admin';
import { resource as userResource, ResourceTag as UserResourceTag } from "./users";
import { resource as tenantsResource, ResourceTag as TenantsTag } from "./tenants";
import { resource as flowsResource, ResourceTag as FlowsTag } from "./flows";


import { Route, Redirect } from 'react-router-dom';
import lithuanianMessages from 'ra-language-lithuanian';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { AppBar } from 'react-admin';
import { Layout } from 'react-admin';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';

import { createMuiTheme } from "@mui/material";
import { Form } from "formik";

const i18nProvider = polyglotI18nProvider(() => lithuanianMessages, 'lt', { allowMissing: true });
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


export interface DataProvider {
    getList: (params: {
        pagination: {
            page: number,
            perPage: number,
        },
        sort: {
            field: string,
            order: string
        }
    }) => Promise<any>,
    getOne: ({ id: string }) => Promise<any>,
    create: (params: any) => Promise<any>,
    update: (params: any) => Promise<any>,
    getMany?: (params: any) => Promise<any>,
    delete?: (id: any) => Promise<any>

}

const Providers = [
    { name: "users", resource: userResource },
    { name: "tenants", resource: tenantsResource },
    { name: "flows", resource: flowsResource }
];
const getOne = (resource, params) => {
    for (let index = 0; index < Providers.length; index++) {
        const provider = Providers[index];
        if (resource === provider.name) {
            return provider.resource.getOne(params);
        }
    }
}
const deleteOne = (resource, params) => {
    for (let index = 0; index < Providers.length; index++) {
        const provider = Providers[index];
        if (resource === provider.name) {
            return provider.resource.delete(params);
        }
    }
}
const myDataProvider = {
    ...dataProvider,
    getList: (resource, params) => {
        for (let index = 0; index < Providers.length; index++) {
            const provider = Providers[index];
            if (resource === provider.name) {
                return provider.resource.getList(params);
            }
        }
        return dataProvider.getList(resource, params);
    },
    getOne: (resource, params) => {
        const resp = getOne(resource, params)
        if (!resp) {
            return dataProvider.getList(resource, params);
        }
        return resp;
    },
    create: (resource, params) => {
        for (let index = 0; index < Providers.length; index++) {
            const provider = Providers[index];
            if (resource === provider.name) {
                return provider.resource.create(params);
            }
        }
        return dataProvider.create(resource, params);
    },
    update: (resource, params) => {
        for (let index = 0; index < Providers.length; index++) {
            const provider = Providers[index];
            if (resource === provider.name) {
                return provider.resource.update(params);
            }
        }
        return dataProvider.update(resource, params);
    },
    getManyReference: () => {
        return Promise.resolve({ data: [] });
    },
    getMany: (resource, params: { ids: Array<string> }) => {
        return Promise.all(params.ids.map(id => getOne(resource, { id }))).then(e => {
            return { data: e.map(e => e.data) }
        })
    },
    delete: (resource, params) => {

        const resp = deleteOne(resource, params)
        if (!resp) {
            return dataProvider.delete(resource, params);
        }
        return resp;
    },
    deleteMany: (resource, params) => {
        return Promise.all(params.ids.map(id => deleteOne(resource, { id }))).then(e => {
            return { data: e }
        })
    }
}

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    },
    spacer: {
        flex: 1,
    },
    logo: {

    },
});

const LogoutButton = React.forwardRef(() => {
    const handleClick = () => {
        window.open("/logout", "_self");
    };
    return (
        <MenuItem
            onClick={handleClick}

        >
            <ExitIcon /> <span style={{ paddingLeft: 10 }}>Atsijungti</span>
        </MenuItem>
    );
});
const CustomAppBar = props => {
    const classes = useStyles();
    return (



        <AppBar {...props} color='secondary' userMenu={true} logout={<LogoutButton />}>

            BIIP/Žvejyba/ <span
                className={classes.title}
                id="react-admin-title"
            />
        </AppBar >

    );
};




const MyLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#121A55"
        },
    },
    typography: {
        fontSize: 25,
    },
});
//@ts-ignore
const AdminApp = () => <Container><Admin locale="lt" title="Biip>Žvejybą" layout={MyLayout} i18nProvider={i18nProvider} dataProvider={myDataProvider} theme={theme} customRoutes={[
    //@ts-ignore
    <Route exact path="/settings"><Redirect to="/settings/1" /></Route>,
    ]}

>
    {UserResourceTag()}
    {TenantsTag()}
    {FlowsTag()}
</Admin></Container>;

const Container = styled.div`
    height: 100vh;
    overflow: auto;
`;
export default AdminApp;
