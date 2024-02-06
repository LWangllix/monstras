import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Icon from "../other/Icon";

interface MenuButtonProps {
  children: JSX.Element | string;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
}

const MenuButton = ({ children, menuOpen, setMenuOpen }: MenuButtonProps) => {
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef?.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <MobileButtonContainer ref={menuRef}>
      <div
        onClick={() => {
          setMenuOpen(!menuOpen);
          // onClickOut();
        }}
      >
        <MenuIcon name="more" />
      </div>
      <AbsoluteContainer>
        {menuOpen ? <Container>{children}</Container> : null}
      </AbsoluteContainer>
    </MobileButtonContainer>
  );
};

const AbsoluteContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 40px;
  right: 16px;
`;

const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 10px;
  overflow: auto;
  width: 100%;
  min-height: 50px;
  background-color: white;
  overflow: hidden;
`;

const MenuIcon = styled(Icon)`
  font-size: 2rem;
  color: #7e83a3;
  margin-right: -4px;
`;

const MobileButtonContainer = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: block;
  }
`;

export default MenuButton;
