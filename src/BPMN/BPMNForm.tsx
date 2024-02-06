<<<<<<< HEAD
import React from "react";
import Form from "@rjsf/core";
import { safeJson } from "./PropsViewer";
import api from "../server/routers/api";
export function BPMNForm(props: {
  element: any;
  formId: string;
  actorId?: string;
  flowId: string;
  entityId?: string;
}) {
  const flowId = props.flowId;
  const formId = props.formId;
  const actorId = props.actorId;
  const entityId = props.entityId;

  return (
    <div>
      <div>Formid: {props.formId}</div>
      <div>FlowId: {props.flowId}</div>
      <Form
        schema={safeJson(props.element.businessObject.jsonForm)}
        onSubmit={(e) => {
          api[flowId][formId]({
            actorId: actorId,
            id: entityId,
            //@ts-ignore
            ...(e.formData || {}),
          });
          alert(JSON.stringify(e.formData, null, 2));
        }}
      />
    </div>
  );
=======
import React from 'react';
import Form from "@rjsf/core";
import { safeJson } from './PropsViewer';
import api from '../server/routers/api';
export function BPMNForm(props: { element: any, formId: string, actorId?: string, flowId: string, entityId?: string }) {
    const flowId = props.flowId;
    const formId = props.formId;
    const actorId = props.actorId;
    const entityId = props.entityId;

    return <div>
        <div>
            Formid: {props.formId}
        </div>
        <div>
            FlowId: {props.flowId}
        </div>
        <Form
        schema={safeJson(props.element.businessObject.jsonForm)}
        onSubmit={(e) => {
            api[flowId][formId]({
                actorId: actorId,
                id: entityId,
                //@ts-ignore
                ...(e.formData || {})
            });
            alert(JSON.stringify(e.formData, null, 2));
        }
        }
        />
    </div>;
>>>>>>> eda9be7f28c30d91ab30ebe91cf61a21d4d94bba
}
