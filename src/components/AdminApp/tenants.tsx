import React, { useEffect, useState } from "react";
import {
  ArrayInput,
  AutocompleteInput,
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  ReferenceInput,
  Resource,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from "react-admin";
import { DataProvider } from ".";
import { TenantPermissions, TenantUserPermissions } from "../../config";
import { User } from "../../server/models/User";
import api from "../../server/routers/api";
import { Result } from "../../monoCommon/server/routers/tenants/api/adminGetOne/config";

const postFilters = [
  <TextInput label="id" source="id" />,
  <TextInput label="Pavadinimas" source="name" defaultValue="" />,
  <TextInput label="Kodas" source="code" defaultValue="" />,
  <TextInput label="email" source="email" defaultValue="" />,
  <TextInput label="El.paštas" source="email" defaultValue="" />,
  <TextInput label="Telefonas" source="phone" defaultValue="" />,
];
const ItemsList = (props) => (
  <List {...props} filters={postFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="code" label="Kodas" />
      <TextField source="name" label="Pavadinimas" />
      <TextField source="email" label="El.adresas" />
      <TextField source="phone" label="Telefonas" />
      <EditButton label="Redaguoti" />
    </Datagrid>
  </List>
);

const Form = () => {
  return (
    <SimpleForm>
      <TextInput source="code" label="Kodas" />
      <TextInput source="name" label="Pavadinimas" />
      <TextInput source="email" label="El.adresas" />
      <TextInput source="phone" label="Telefonas" />
      {TenantPermissions.map((tenantPermission) => {
        return (
          <SelectInput
            key={tenantPermission.id}
            label={tenantPermission.label}
            source={"permission." + tenantPermission.id}
            choices={Object.values(tenantPermission.statuses).map((v) => {
              return { id: v, name: v };
            })}
          />
        );
      })}
      <ArrayInput optionText="Nariai" source="tenantUsers" label="Nariai">
        <SimpleFormIterator>
          <TextInput source="email" label="El.adresas" />
          <TextInput source="phone" label="Telefonas" />

          {TenantUserPermissions.map((tenantUserPermission) => {
            return (
              <SelectInput
                key={tenantUserPermission.id}
                label={tenantUserPermission.label}
                source={"permission." + tenantUserPermission.id}
                choices={Object.values(tenantUserPermission.statuses).map(
                  (v) => {
                    return { id: v, name: v };
                  }
                )}
              />
            );
          })}
          <ReferenceInput
            label="Vartotojas"
            source="user.id"
            reference="users"
            perPage={Number.MAX_VALUE}
            filterToQuery={() => {}}
          >
            <AutocompleteInput
              optionText={(params: User) => {
                return params?.name + " " + "(" + params?.username + ")";
              }}
            />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};

export const PostCreate = (props) => <Create {...props}>{Form()}</Create>;

export const PostEdit = (props) => {
  const [tenant, setTenant] = useState<Result>();
  useEffect(() => {
    api.tenants.adminGetOne({ id: props.id }).then((e) => {
      const u = e as Result;
      setTenant(u);
    });
  }, [props.id]);
  return (
    <Edit {...props} title={tenant?.data?.name}>
      {Form()}
    </Edit>
  );
};

export const resource: DataProvider = {
  getList: (params) => {
    return api.tenants.adminList(params);
  },
  getOne: (params) => {
    return api.tenants.adminGetOne({ id: params.id });
  },
  delete: (params) => {
    return api.tenants.adminDelete({ id: params.id });
  },
  update: ({ id, data }) => {
    return api.tenants.adminCreateOrUpdateOne({
      ...data,
      id,
    });
  },
  create: (params) => {
    return api.tenants.adminCreateOrUpdateOne({
      ...params.data,
      id: undefined,
    });
  },
};
export const ResourceTag = () => {
  return (
    <Resource
      list={ItemsList}
      name="tenants"
      options={{ label: "Organizacijos" }}
      create={PostCreate}
      edit={PostEdit}
    />
  );
};
