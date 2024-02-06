import React from "react";
import Button from "../buttons/Button";

export const EVartaiButton = (props: {
  label?: string;
  ticket?: { actionUrl: string; ticket: string };
}) => {
  const ticket = props.ticket;
  if (ticket) {
    return (
      <form name="REQUEST" method="post" action={ticket.actionUrl}>
        <input type="hidden" name="ticket" value={ticket.ticket} />
        <Button>{props.label || "Prisijunti per el. valžios vartus"}</Button>
      </form>
    );
  }
  return <React.Fragment />;
};
