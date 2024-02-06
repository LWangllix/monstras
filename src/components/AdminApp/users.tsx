// @ts-nocheck
import CustomizableDatagrid from "ra-customizable-datagrid";
import React, { useEffect, useState } from "react";
import {
  Create,
  Edit,
  EditButton,
  List,
  PasswordInput,
  Resource,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { DataProvider } from ".";
import { Permissions, UserPermissions } from "../../config";
import api from "../../server/routers/api";
import { Result } from "../../monoCommon/server/routers/users/api/adminGetOne/config";

const permissions = Object.values(Permissions).map((v) => {
  return { ...v, id: v.id, name: v.label };
});

const postFilters = [
  <TextInput label="id" source="id" />,
  <TextInput label="Vardas" source="name" defaultValue="" />,

  <TextInput label="Pavardė" source="lastName" defaultValue="" />,

  <TextInput label="Vartotojas/kodas" source="username" defaultValue="" />,

  <TextInput label="El.paštas" source="email" defaultValue="" />,

  <TextInput label="Telefonas" source="phone" defaultValue="" />,
  <TextInput label="Dalinys" source="tenantUnit" defaultValue="" />,

  ...permissions.map((permission) => (
    //@ts-ignore
    <TextInput source={"permission." + permission.id} label={permission.id} />
  )),
];
const UserList = (props) => (
  <List {...props} filters={postFilters}>
    <CustomizableDatagrid
      defaultColumns={["id", "name", "lastName", "username", "email", "phone"]}
    >
      <TextField source="id" />
      <TextField source="name" label="Vardas" />
      <TextField source="lastName" label="Pavardė" />
      <TextField source="username" label="Kodas/vartotojo vardas" />
      <TextField source="email" label="El.adresas" />
      <TextField source="phone" label="Telefonas" />
      {UserPermissions.map((permission) => (
        <TextField
          source={"permission." + permission.id}
          label={permission.label}
        />
      ))}
      <EditButton label="Redaguoti" />
    </CustomizableDatagrid>
  </List>
);

const Form = () => {
  return (
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="lastName" />
      <TextInput source="phone" />
      <TextInput source="tenantUnit" />
      <TextInput source="email" />
      <TextInput source="username" />
      <PasswordInput source="password" />
      {UserPermissions.map((permission) => (
        <SelectInput
          label={permission.label}
          source={"permission." + permission.id}
          choices={Object.values(permission.statuses).map((v) => {
            return { id: v, name: v };
          })}
        />
      ))}
    </SimpleForm>
  );
};

export const PostCreate = (props) => <Create {...props}>{Form()}</Create>;

export const PostEdit = (props) => {
  const [user, setUser] = useState<Result>();
  useEffect(() => {
    api.users.adminGetOne({ id: props.id }).then((e) => {
      const u = e as Result;
      setUser(u);
    });
  }, [props.id]);
  return (
    <Edit {...props} title={user?.data?.name + " " + user?.data?.lastName}>
      {Form()}
    </Edit>
  );
};

export const resource: DataProvider = {
  getList: async (params) => {
    const data = api.users.adminList(params);
    return data;
  },
  getOne: (params) => {
    return api.users.adminGetOne({ id: params.id });
  },
  delete: (params) => {
    return api.users.adminDelete({ id: params.id });
  },
  update: ({ id, data }) => {
    return api.users.adminCreateOrUpdateOne({
      id,
      ...data,
    });
  },
  create: (params) => {
    return api.users.adminCreateOrUpdateOne({
      ...params.data,
      id: undefined,
    });
  },
};

export const ResourceTag = () => {
  return (
    <Resource
      list={UserList}
      name="users"
      options={{ label: "Vartotojai" }}
      create={PostCreate}
      edit={PostEdit}
    />
  );
};
