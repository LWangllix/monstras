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
  ...permissions.map((permission) => (
    //@ts-ignore
    <TextInput source={"permission." + permission.id} label={permission.id} />
  )),
];
const FormList = (props) => (
  <List {...props} filters={postFilters} rowClick={(id, basePath, record) => "/ok/" + id}>
    <CustomizableDatagrid
      rowClick={(id, basePath, record) => {
        window.location.href = "/bpmn/" + id;
      }}
      defaultColumns={["id"]}
    >
      <TextField source="id" />
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
    const data = api.flow.list(params);
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
      list={FormList}
      name="flows"
      options={{ label: "Flows" }}
      create={PostCreate}
      edit={PostEdit}
    />
  );
};
