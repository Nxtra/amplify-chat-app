import { API, Auth, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

export const listTodos = async () => {
  console.log("Service is fetching todos...");
  const todoData = await API.graphql(graphqlOperation(queries.listTodos));
  const todos = todoData.data.listTodos.items;
  console.log("Service fetched todos:", todos);
  return todos;
};

export const addTodo = async (todo) => {
  await API.graphql(graphqlOperation(mutations.createTodo, { input: todo }));
};

export const subscribeNewTodo = async (action) => {
  try {
    const updatedTodo = API.graphql({
      query: subscriptions.onCreateTodo,
    }).subscribe({
      next: (data) => {
        console.log("Subscription was triggered");
        console.log("Subscription received data", data.value.data.onCreateTodo);
        action(data.value.data.onCreateTodo);
      },
      error: (error) => console.warn(error),
    });

    return updatedTodo;
  } catch (err) {
    console.error("err: ", err);
  }
};
