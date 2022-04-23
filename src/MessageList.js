import React from "react";
import { ScrollView } from "@aws-amplify/ui-react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <ScrollView
      border="thick double #32a1ce"
      height="20rem"
      padding="0.5rem"
      orientation="vertical"
    >
      {messages.map((message, index) => (
        <Message key={message.id} message={message} />
      ))}
    </ScrollView>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  message: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  messageName: { fontSize: 20, fontWeight: "bold" },
  messageText: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default MessageList;
