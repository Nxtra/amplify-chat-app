import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as messageService from "../service/messageService";

const useMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Messages in hook", messages);
  }, [messages]);

  useEffect(() => {
    const getExistingMessages = async () => {
      await fetchMessages();
    };
    getExistingMessages();
  }, []);

  useEffect(() => {
    if (messages) {
      const subscribe = async () => {
        await messageService.subscribeNewMessage(fetchMessages);
      };
      subscribe();
    }
  }, [messages]);

  async function fetchMessages() {
    try {
      const messages = await messageService.listMessages();
      setMessages(messages);
    } catch (err) {
      console.log("error fetching messages");
    }
  }

  async function addMessage(message) {
    try {
      await messageService.addMessage(message);
    } catch (err) {
      console.log("error creating message:", err);
    }
  }

  return {
    messages,
    setMessages,
    fetchMessages,
    addMessage,
  };
};

export default useMessages;
