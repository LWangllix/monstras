import { map } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Icon from "../other/Icon";

interface SImpleSelectProps {
  value?: { route: string; label: string; isSelected: boolean };
  options?: any[];
  className?: string;
  getOnptionLabel?: (option) => string;
  isOptionTheSame?: (option, value) => boolean;
  onChange?: (props) => void;
  iconRight?: string;
  iconleft?: string;
  showLabel?: boolean;
}

const SimpleSelect = ({
  value,
  options,
  className,
  getOnptionLabel,
  isOptionTheSame,
  onChange,
  iconRight,
  iconleft,
  showLabel,
}: SImpleSelectProps) => {
  const [showSelect, setShowSelect] = useState(false);
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelect(false);
    }
  };

  const handleClick = (option) => {
    setShowSelect(false);
    onChange(option);
  };

  return (
    <Container className={className}>
      <RelativeContainer tabIndex={1} onBlur={handleBlur}>
        {
          <>
            <OptionButton onClick={() => setShowSelect(!showSelect)}>
              {iconleft ? <MenuIcon name={iconleft} /> : null}
              {showLabel ? (
                <OptionLabel>{getOnptionLabel(value) || ""}</OptionLabel>
              ) : null}
              {iconRight ? <MenuIcon name={iconRight} /> : null}
            </OptionButton>
            {showSelect ? (
              <OptionContainer>
                {map(options, (option, index) => {
                  if (!isOptionTheSame(option, value)) {
                    return (
                      <Option
                        key={index}
                        onClick={() => {
                          handleClick(option);
                        }}
                      >
                        {getOnptionLabel(option)}
                      </Option>
                    );
                  }
                })}
              </OptionContainer>
            ) : null}
          </>
        }
      </RelativeContainer>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  @media ${device.mobileL} {
    border: none;
  }
  &:focus {
    outline-width: 0;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const OptionContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 4;
  min-width: 250px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 16px #121a5529;
  border-radius: 4px;
  padding: 16px 0;
`;

const Option = styled.div`
  padding: 0px 16px;
  font: normal normal 500 1.6rem/36px Manrope;
  &:hover {
    background: #f3f3f7 0% 0% no-repeat padding-box;
  }
`;

const OptionButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 8px;
  cursor: pointer;
`;

const OptionLabel = styled.span`
  font: normal normal 600 16px/40px Manrope;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  position: relative;
`;

const MenuIcon = styled(Icon)`
  height: 40px;
  font-size: 2.4rem;
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default SimpleSelect;
