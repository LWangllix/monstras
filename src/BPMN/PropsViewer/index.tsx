import { is } from 'bpmn-js/lib/util/ModelUtil';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import React, { Component } from 'react';
import { BPMNForm } from '../BPMNForm';
import Select from 'react-select'

interface Props {
    flowId: string;
    modeler: any;
    entityId?: string;
    actorId?: string;
}
export default class PropertiesView extends Component<Props, any> {

    constructor(props) {
        super(props);

        this.state = {
            selectedElements: [],
            element: null
        };
    }
    componentDidMount() {
        const {
            modeler
        } = this.props;

        modeler.on('selection.changed', (e) => {
            const {
                element
            } = this.state;

            this.setState({
                selectedElements: e.newSelection,
                element: e.newSelection[0]
            });
        });


        modeler.on('element.changed', (e) => {

            const {
                element
            } = e;
            console.log(e);
            const {
                element: currentElement
            } = this.state;

            if (!currentElement) {
                return;
            }

            // update panel, if currently selected element changed
            if (element.id === currentElement.id) {
                this.setState({
                    element
                });
            }

        });
    }

    render() {

        const {
            modeler
        } = this.props;

        const {
            selectedElements,
            element
        } = this.state;

        return (
            <div>

                {
                    selectedElements.length === 1
                    && <ElementProperties flowId={this.props.flowId} modeler={modeler} element={element} actorId={this.props.actorId} entityId={this.props.entityId} />
                }

                {
                    selectedElements.length === 0
                    && <span>Please select an element.</span>
                }

                {
                    selectedElements.length > 1
                    && <span>Please select a single element.</span>
                }
            </div>
        );
    }

}


function ElementProperties(props: { modeler: any, element: any, flowId: string, entityId?: string, actorId?: string }) {

    let {
        element,
        modeler
    } = props;

    if (element.labelTarget) {
        element = element.labelTarget;
    }

    function updateName(name) {
        const modeling = modeler.get('modeling');
        console.log(getBusinessObject(element));
        modeling.updateLabel(element, name);
    }
    function updateProperties(properties) {
        const modeling = modeler.get('modeling');

        modeling.updateProperties(element, properties);

    }
    function updateId(name) {
        const modeling = modeler.get('modeling');

        modeling.updateLabel(element, name);
    }

    const formId = element.businessObject.id || '';
    return (
        <div className="element-properties" key={element.id}>
            <fieldset>

                <label>Id</label>
                <input value={formId} onChange={(event) => {
                    updateProperties({ id: event.target.value })
                }} />
            </fieldset>

            <fieldset>
                <label>name</label>
                <input value={element.businessObject.name || ''} onChange={(event) => {
                    updateName(event.target.value)
                }} />
            </fieldset>
            {element.type === "bpmn:StartEvent" && <fieldset>

                <label>Flow id </label>
                <textarea value={element.businessObject.flowId || ''} onChange={(event) => {
                    updateProperties({ flowId: event.target.value })
                }} />
            </fieldset>}
            {element.type === "bpmn:UserTask" && <fieldset>

                <label>JsonForm</label>
                <textarea value={element.businessObject.jsonForm || ''} onChange={(event) => {
                    updateProperties({ jsonForm: event.target.value })
                }} />
            </fieldset>}
            {element.type === "bpmn:UserTask" && <fieldset>

                <label>Kandidatai</label>
                <label>Kandidatai</label>
                <textarea value={element.businessObject.candidates || ''} onChange={(event) => {
                    updateProperties({ candidates: event.target.value })
                }} />
            </fieldset>}

            {element.type === "bpmn:UserTask" && <fieldset>

                <label>Forma</label>
                <BPMNForm
                    actorId={props.actorId}
                    formId={formId}
                    element={element}
                    flowId={props.flowId}
                    entityId={props.entityId} />
            </fieldset>}

            <pre>
                {JSON.stringify(element, null, 2)}
            </pre>




        </div>
    );
}
export function safeJson(value: string) {
    try {
        return JSON.parse(value);
    } catch (e) {
        console.warn('Failed to parse JSON', value, e);
        return {};
    }
}



// helpers ///////////////////

function hasDefinition(event, definitionType) {

    const definitions = event.businessObject.eventDefinitions || [];

    return definitions.some(d => is(d, definitionType));
}