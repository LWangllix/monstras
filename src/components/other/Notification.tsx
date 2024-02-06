import React from "react";
import styled from "styled-components";
import Icons from "../other/Icon";

interface NotificationProps {
  error: boolean;
  text: string;
  onClose?: () => void;
  className?: string;
}

const Notification = ({
  error,
  text,
  onClose,
  className,
}: NotificationProps) => {
  return (
    <Container error={error} className={className}>
      <NotificationTExt error={error}>{text}</NotificationTExt>
      {onClose ? (
        <CloseIcon fun={() => onClose()} name="close" error={error} />
      ) : null}
    </Container>
  );
};

const Container = styled.div<{ error: boolean }>`
  background-color: ${({ error }) => (!error ? "#d4ffcf" : "#FFE6EA")};
  border: 1px solid ${({ error }) => (!error ? "#60b158" : "#FE5B78")};
  border-radius: 4px;
  padding: 0 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const CloseIcon = styled(Icons)<{ error: boolean }>`
  color: ${({ error }) => (!error ? "#60b158" : "#FE5B78")};
  font-size: 2.2rem;
  cursor: pointer;
`;

const NotificationTExt = styled.div<{ error: boolean }>`
  font: normal normal medium 1.4rem/40px Manrope;
  color: ${({ error }) => (!error ? "#60b158" : "#FE5B78")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Notification;
