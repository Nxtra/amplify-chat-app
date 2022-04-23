import React from "react";
import moment from "moment";

const Message = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0.4rem",
        border: "1px solid black",
        borderRadius: "0.2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ fontWeight: "700" }}>{message.senderId}</div>
        <div style={{ fontStyle: "italic" }}>
          {moment(message.createdAt).format("YYYY-DD-MM @ HH:mm")}
        </div>
      </div>

      <div>{`> ${message.text}`}</div>
    </div>
  );
};

export default Message;
