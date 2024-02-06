import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

export interface DefaultLayoutProps {
  children?: JSX.Element;
  renderMap?: JSX.Element;
  mapFocused?: boolean;
  onMapModalClose?: (visible: boolean) => void;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children, onMapModalClose = () => {} } = props;

  const router = useRouter();

  return <Content>{children}</Content>;
};

const Content = styled.div`
  background-color: white;
  background-image: url("/backgroundImageLeftTop.png");
  background-attachment: fixed;
  background-position: top left;
  background-repeat: no-repeat;
  overflow: auto;
  height: 100%;
  z-index: 9;
  position: relative;
`;

export default DefaultLayout;
