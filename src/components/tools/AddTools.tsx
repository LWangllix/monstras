import { filter } from "lodash";
import { useRouter } from "next/router";
import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Tool } from "../../server/models/Tool";
import api from "../../server/routers/api";
import { Location } from "../../types";
import AddButton from "../buttons/AddButton";
import AddToolsAutoComplete from "./AddToolsAutoComplete";

interface AddToolsProps {
  disabled?: boolean;
  location?: Location;
  onOptionSelecet?: (tool: Tool) => void;
}

export const AddTools = memo(
  ({ onOptionSelecet, disabled, location }: AddToolsProps) => {
    const dropDownRef = useRef(null);

    const [showSelect, setShowSelect] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [tools, setTools] = useState([]);
    const router = useRouter();
    const groupTools = (options) => {
      const data = [];
      const groups = [];
      options?.forEach((tool) => {
        if (!groups.includes(tool.group_id)) {
          const toolsGroup = filter(options, (t) => {
            if (t.group_id === tool.group_id) return t;
          });
          data.push({
            groupId: tool.group_id,
            tools: toolsGroup,
          });
          groups.push(tool.group_id);
        }
      });
      return data;
    };

    const handleClickOutside = (event) => {
      if (dropDownRef?.current && !dropDownRef.current.contains(event.target)) {
        setShowSelect(false);
        setInputValue("");
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    useEffect(() => {
      if (showSelect) {
        api.tools
          .toolsForFshingLocation({
            waterBodyId: location?.waterBody?.id,
            isPolder: router.query.tipas === "polderis",
          })
          .then((response) => {
            const updatedTools = response["tools"];
            if (updatedTools) {
              setTools(groupTools(updatedTools));
            }
          });
      }
    }, [showSelect]);

    return (
      <Container ref={dropDownRef}>
        <AddButton
          onClick={() => {
            setShowSelect(!showSelect);
            setInputValue("");
          }}
          text={"Pridėti įrankį"}
          disabled={disabled}
        />
        <AddToolsAutoComplete
          onChange={onOptionSelecet}
          options={tools}
          showSelect={showSelect}
          onSearch={setInputValue}
          onSetShowSelect={setShowSelect}
          serachVal={inputValue}
        />
      </Container>
    );
  }
);

const Container = styled.div`
  position: relative;
`;

export default AddTools;
