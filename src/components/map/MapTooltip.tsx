import React from "react";
import { Popup } from "react-leaflet";
import styled from "styled-components";

interface MapPopupProps {
  children: JSX.Element;
}

const MapPopup = ({ children }: MapPopupProps) => {
  return <StyledPopup>{children}</StyledPopup>;
};

export default MapPopup;

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 10px;
    width: 251px;
    padding: 12px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 8px 16px #121a5514;
    border-radius: 8px;
    opacity: 1;
  }
  .leaflet-popup-content {
    width: 100% !important;
  }
  .leaflet-popup-content p {
    margin: 0px;
  }
  .leaflet-popup-content {
    margin: 0px;
  }
  /* a.leaflet-popup-close-button {
    font-size: 2.5rem;
    margin: 2px;
  }


  .leaflet-popup-tip {
    box-shadow: none;
    position: absolute;
    top: -5px;
    left: 11px;
  } */
`;
