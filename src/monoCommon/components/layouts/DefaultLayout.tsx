import { useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import split from "react-split";
import styled from "styled-components";
import { device, MIN_CONTENT_SIZE_PX } from "../../../styles";
import { setHideResizeIconContext } from "../../../utils/AppContextProvider";
import Icons from "../../../components/other/Icon";

export interface DefaultLayoutProps {
  children?: JSX.Element;
  renderMap?: JSX.Element;
  navBar: JSX.Element;
  mapFocused?: boolean;
  onMapModalClose?: (visible: boolean) => void;
  lazyLoadingScroll?: (e: any) => void;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const DefaultLayout = ({
  renderMap,
  navBar,
  children,
  mapFocused,
  lazyLoadingScroll,
  onMapModalClose = () => {},
  ...rest
}: DefaultLayoutProps) => {
  const { hideResizeIcon } = React.useContext(setHideResizeIconContext);
  const [contenWidth, setContentWidth] = useState(100);
  const [showMap, setShowMap] = useState(false);
  const isMobile = useMediaQuery(device.mobileL);
  const isTablet = useMediaQuery(device.tablet);
  useEffect(() => {
    function handleResizeForWidth(forWidth) {
      const dimens = getWindowDimensions();
      const w = dimens.width;
      const percentage = Math.round((forWidth * 100) / w);
      setContentWidth(percentage < 100 ? percentage : 100);
    }

    window.addEventListener("resize", () =>
      handleResizeForWidth(MIN_CONTENT_SIZE_PX)
    );
    handleResizeForWidth(1000);
    return () => window.removeEventListener("resize", handleResizeForWidth);
  }, []);

  if (isMobile) {
    return (
      <MobileContainer>
        <MobileContent
          onScroll={(e) => {
            lazyLoadingScroll && lazyLoadingScroll(e);
          }}
          visible={mapFocused}
        >
          <>
            <NavBarContainer> {navBar} </NavBarContainer>
            {children}
          </>
        </MobileContent>
        <Modal visible={mapFocused}>
          <IconContainer onClick={() => onMapModalClose(false)}>
            <Icon name="close" />
          </IconContainer>
          {renderMap}
        </Modal>
      </MobileContainer>
    );
  } else if (isTablet) {
    return (
      <TabletContainer>
        <NavBarContainer>
          {navBar}
          <ButtonContainer>
            <ButtonContainerInner onClick={() => setShowMap(!showMap)}>
              <StyledIcon name={!showMap ? "map" : "list"} />
              <FilterBut>{!showMap ? "Žemėlapis" : "Sąrašas"} </FilterBut>
            </ButtonContainerInner>
          </ButtonContainer>
        </NavBarContainer>

        <TabletInnerContainer>
          {showMap && (
            <MapContainer visible={showMap}>{renderMap}</MapContainer>
          )}
          <MobileContent
            onScroll={(e) => {
              lazyLoadingScroll && lazyLoadingScroll(e);
            }}
            visible={showMap}
          >
            {children}
          </MobileContent>
        </TabletInnerContainer>
      </TabletContainer>
    );
  } else {
    return (
      <Container
        hide_resize_icon={hideResizeIcon ? 1 : 0}
        draggable={true}
        sizes={[contenWidth, 100 - contenWidth]}
        minSize={MIN_CONTENT_SIZE_PX}
        {...rest}
      >
        <Content
          onScroll={(e) => {
            lazyLoadingScroll && lazyLoadingScroll(e);
          }}
        >
          <NavBarContainer> {navBar} </NavBarContainer>
          {children}
        </Content>
        {renderMap}
      </Container>
    );
  }
};

const Container = styled(split)<{ hide_resize_icon: number }>`
  background-color: white;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: white;
  background-image: url("/backgroundImageLeftTop.png");
  background-attachment: fixed;
  background-position: top left;
  background-repeat: no-repeat;

  .gutter {
    background-color: white;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 40px !important;
    height: 40px;
    border-radius: 20px;
    display: flex;
    box-shadow: 0px 4px 8px #121a5529;
    z-index: 7;
    margin: auto -20px;
    display: ${({ hide_resize_icon }) => (hide_resize_icon ? "none" : "block")};
  }
  .gutter.gutter-horizontal {
    background-image: url("/icons/resize.svg");
    cursor: pointer;
  }
`;

const NavBarContainer = styled.div`
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;

const MobileContainer = styled.div`
  position: relative;
  overflow: scroll;
  min-height: 100%;
  height: 100%;
  width: 100%;
  background-color: white;
  background-image: url("/backgroundImageLeftTop.png");
  background-attachment: fixed;
  background-position: top left;
  background-repeat: no-repeat;
`;

const TabletInnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 118px);
`;

const MapContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  width: 100%;
  height: 100%;
  padding: 24px 32px;
`;

const TabletContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: white;
  background-image: url("/backgroundImageLeftTop.png");
  background-attachment: fixed;
  background-position: top left;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  z-index: 7;
  position: relative;
  overflow-y: auto;
`;

const MobileContent = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: white;
  display: ${({ visible }) => (visible ? "none" : "block")};

  background-image: url("/backgroundImageRightTop.png");
  background-attachment: fixed;
  background-position: top right;
  background-repeat: no-repeat;
`;

const Icon = styled(Icons)`
  font-size: 2rem;
`;

const IconContainer = styled.div`
  display: flex;
  padding: 16px;
  cursor: grab;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
`;

const Modal = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  position: fixed;
  z-index: -10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const FilterBut = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: 0px;
  color: #121a55;
  margin-left: 11px;
`;

const ButtonContainer = styled.div``;

const ButtonContainerInner = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default DefaultLayout;
