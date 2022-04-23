import { API, Auth, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

export const listMessages = async () => {
  console.log("Service is fetching messages...");
  const messageData = await API.graphql(graphqlOperation(queries.listMessages));
  const messages = messageData.data.listMessages.items;
  console.log("Service fetched messages:", messages);
  return messages;
};

export const addMessage = async (message) => {
  const now = new Date().toISOString();
  const currentUserInfo = await Auth.currentUserInfo();
  console.log(currentUserInfo);
  const senderId = await Auth.currentUserInfo().then((user) => user.username);
  message.createdAt = now;
  message.senderId = senderId;
  await API.graphql(
    graphqlOperation(mutations.createMessage, { input: message })
  );
};

export const subscribeNewMessage = async (action) => {
  try {
    const updatedMessage = API.graphql({
      query: subscriptions.onCreateMessage,
    }).subscribe({
      next: (data) => {
        console.log("Subscription was triggered");
        console.log(
          "Subscription received data",
          data.value.data.onCreateMessage
        );
        action(data.value.data.onCreateMessage);
      },
      error: (error) => console.warn(error),
    });

    return updatedMessage;
  } catch (err) {
    console.error("err: ", err);
  }
};
