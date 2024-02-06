import { ReactChild } from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import styled from "styled-components";
import { useAlert as _useAlert } from 'react-alert';
import { AiOutlineClose } from "react-icons/ai";

export const useAlert = _useAlert;

const AlertTemplate = ({ style, options, message, close }) => {
    if (options.type === 'error') {
        return <NOTOKdiv style={style}>
            <div style={{ flexGrow: 1 }}>{message}</div>
            <a onClick={close}><AiOutlineClose /></a>
        </NOTOKdiv>
    }
    return <OKdiv style={style}>
        <div style={{ flexGrow: 1 }}>{message}</div>
        <a onClick={close}><AiOutlineClose /></a>
    </OKdiv>
}
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 15000,
    offset: '8px',
    // you can also just use 'scale'
    transition: transitions.FADE
}
const Alerts = (props: { children: ReactChild }) => {
    return <AlertProvider template={AlertTemplate} {...options}>
        {props.children}
    </AlertProvider>
}

export const showError = (message: string) => {
}

const OKdiv = styled.div`
    display: flex;
    width: 472px;
    align-items: center;
    height: 48px;
    background: #D4FFCF 0% 0% no-repeat padding-box;
    border: 1px solid #60B158;
    border-radius: 4px;
    padding: 0px 16px;
    

`;
const NOTOKdiv = styled(OKdiv)`
    background: #FFE6EA 0% 0% no-repeat padding-box;
    border: 1px solid #FE5B78;
    font: normal normal medium 16px/40px Manrope;
    letter-spacing: 0px;
    color: #FE5B78;
`;
export default Alerts;