import Form from "@rjsf/core";
import styled from "styled-components";
import { safeJson } from "../../BPMN/PropsViewer";

import TextField from "../../components/fields/TextField";
import SelectField from "../../components/fields/SelectField";
import SimpleButton from "../../components/buttons/SimpleButton";
import DateContainer from "../../components/fields/Datepicker";
import { useEffect, useState } from "react";

const schema = {
  type: "array",
  title: "A list of strings",
  items: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        description: "The person's first name.",
      },
      date: {
        type: "string",
        description: "The person's last name.",
      },
      age: { type: "string" },
      ram: { type: "string" },
    },
  },
};

const InputDate = (props) => {
  console.log(props);

  return (
    <DateContainer
      value={props?.formData ? new Date(props?.formData) : null}
      onChange={(data) => props.onChange(data ? data.toString() : null)}
    />
  );
};

const widgets = {};

const customInputField = (props) => {
  return (
    <TextField
      label={props.description}
      onChange={(event) => props.onChange(event.target.value)}
      value={props?.formData}
    />
  );
};

const customSelectField = (props) => {
  const [state, setState] = useState([
    { id: 4, name: "ulylylyl" },
    { id: 14, name: "ulylylyadsl" },
    { id: 114, name: "dsa" },
  ]);
  return (
    <SelectField
      label={props.description}
      options={state}
      getOptionLabel={(value) => value.name || null}
      onChange={(event) => props.onChange(event)}
      value={props?.formData}
    />
  );
};

const fields = {
  StringField: customInputField,
  dateInfo: InputDate,
  selectFie: customSelectField,
};
const uiSchema = {
  items: {
    date: {
      "ui:field": "dateInfo",
    },
    ram: {
      "ui:field": "selectFie",
    },
  },
  "ui:options": {
    inline: true,
  },
};

function ArrayFieldTemplate(props) {
  return (
    <div>
      {props.items.map((element) => {
        console.log(element.children);
        return (
          <Array key={element.key}>
            {element.children}
            <button
              type="button"
              onClick={element.onDropIndexClick(element.index)}
            >
              trinti
            </button>
          </Array>
        );
      })}
      {props.canAdd ? (
        <SimpleButton type="button" onClick={props.onAddClick}>
          + Pridėti žuvį
        </SimpleButton>
      ) : null}
    </div>
  );
}

const CustomFieldTemplate = (props) => {
  const { id, help, required, description, errors, children } = props;
  return <StyledForm>{children}</StyledForm>;
};

const test = () => {
  return (
    <Form
      schema={safeJson(JSON.stringify(schema))}
      FieldTemplate={CustomFieldTemplate}
      uiSchema={uiSchema}
      ArrayFieldTemplate={ArrayFieldTemplate}
      onSubmit={(e) => console.log(e)}
      fields={fields}
    />
  );
};

const StyledForm = styled.div`
  padding: 10px;
`;

const Array = styled.div`
  display: flex;

  fieldset {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default test;
