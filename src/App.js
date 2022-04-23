/* src/App.js */
import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "./graphql/mutations";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import MessageList from "./MessageList";
import awsExports from "./aws-exports";
import useMessages from "./hooks/useMessages";
Amplify.configure(awsExports);

const initialState = { text: "" };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const { messages, addMessage } = useMessages();

  async function addMessageToList() {
    try {
      if (!formState.text) return;
      const message = { ...formState };
      addMessage(message);
      setFormState(initialState);
    } catch (err) {
      console.log("error creating message:", err);
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={styles.container}>
          <h1>Hello {user.username}</h1>
          <button style={styles.button} onClick={signOut}>
            Sign out
          </button>
          <br />
          <h2>Send message</h2>
          <input
            onChange={(event) => setInput("text", event.target.value)}
            style={styles.input}
            value={formState.text}
            placeholder="Message text.."
          />
          <button style={styles.button} onClick={addMessageToList}>
            Create Message
          </button>
          {messages && <MessageList messages={messages} />}
        </div>
      )}
    </Authenticator>
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
  messagetext: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default App;
