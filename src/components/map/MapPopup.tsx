import React from "react";
import { Popup } from "react-leaflet";
import styled from "styled-components";
import { device } from "../../styles";

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
    width: 303px;
    margin-left: 170px;
    padding: 35px 0px;
    box-shadow: 0px 2px 16px #121a5529;
    @media ${device.mobileL} {
      margin-left: 0px;
    }
  }
  .leaflet-popup-content p {
    margin: 0px;
  }
  .leaflet-popup-content {
    margin: 0px;
  }
  a.leaflet-popup-close-button {
    font-size: 2.5rem;
    margin: 10px;
  }

  .leaflet-popup-tip {
    box-shadow: none;
    position: absolute;
    top: -5px;
    left: 11px;
  }
`;
