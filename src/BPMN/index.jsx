import React, { useEffect, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import biipFormModdleDescriptor from "./biipform"
import diagramXML from './diagram.js';
import PropViewOrg from './PropsViewer';
import styled from "styled-components";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';
import api from '../server/routers/api';

let bpmnViewer;
export default function _BPMNEditor(props) {
    const containerRef = React.useRef()
    const [state, setState] = useState({});
    useEffect(() => {
        buildFileSelector();
        const container = containerRef.current;
        bpmnViewer = new BpmnModeler({
            container,
            propertiesPanel: {
                parent: '#js-properties-panel'
            },
            additionalModules: [
            ],
            moddleExtensions: {

                biip: biipFormModdleDescriptor
            }

        });
        api.flow.getOne({ id: props.id }).then(res => {
            openXml(res.xml);
        });
        bpmnViewer.on('commandStack.changed', async () => {
            const { xml } = await bpmnViewer.saveXML({ format: true });
            var encodedData = encodeURIComponent(xml);
            setState({ ...state, loaded: true, xml, encodedData });
        });
        return () => {
            bpmnViewer.destroy();
        }
    }, [])
    const openXml = (diagramXML) => {
        bpmnViewer.importXML(diagramXML).then(() => {
            var encodedData = encodeURIComponent(diagramXML);
            setState({ loaded: true, xml: diagramXML, encodedData });
        }).catch(e => {
            alert("Error reading BPMN")
        })
    }
    const showFile = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            openXml(text);
        };
        reader.readAsText(e.target.files[0]);
    };
    return <Container>
        {!(state?.xml) && <Open>
            <div>Atidaryti
                <div>
                    <input type="file" onChange={showFile} />
                </div>
            </div></Open>
        }
            <PropertiesPanel>
            {state && state.loaded && <PropViewOrg modeler={bpmnViewer} flowId={props.id} entityId={props.entityId} actorId={props.actorId} />}
        </PropertiesPanel>
        <div style={{ height: "100%" }} ref={containerRef}>

        </div>
        <DownloadLink><a download={"bpmn.bpmn"} href={'data:application/bpmn20-xml;charset=UTF-8,' + state?.encodedData}><SaveIcon /> Saugoti </a>  Atidaryt <input type="file" onChange={showFile} /></DownloadLink>
        <ServerSave onClick={() => {
            api.flow.save({ id: props.id, xml: state.xml }).then(res => {
                alert("Saved")
            })
        }}>Saugoti į serverį</ServerSave>
    </Container>
}

const Open = styled.div`

    width:100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
//      <PropViewOrg modeler={this.bpmnViewer} />
/// <PropertiesView style={{ position: "fixed" }} modeler={this.bpmnViewer} />
const Container = styled.div`
   height: 100vh;
   width: 100vw;
    background-color: white;
`;
const DownloadLink = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
`;
const ServerSave = styled.div`
    position: fixed;
    bottom: 30px;
    left: 0;
`;
const PropertiesPanel = styled.div`
    z-index: 100; 
    padding: 10px;
    position: fixed;
    right: 0;
    top: 0;
    background-color: #f3f3f3;
    width: 300px;
    height: 100%;
    overflow-y: auto;
`;

function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
}
