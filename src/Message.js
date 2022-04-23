import React from "react";

const Message = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0.2rem",
        border: "1px solid black",
        borderRadius: "0.2rem",
      }}
    >
      <div style={{ fontWeight: "700" }}>{message.senderId}</div>
      <div>{`> ${message.text}`}</div>
    </div>
  );
};

export default Message;
