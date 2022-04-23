import { API, Auth, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

export const listTodos = async () => {
  const todoData = await API.graphql(graphqlOperation(queries.listTodos));
  const todos = todoData.data.listTodos.items;
  return todos;
};

export const addTodo = async (todo) => {
  await API.graphql(graphqlOperation(mutations.createTodo, { input: todo }));
};

// export const subscribeNewTodo = async (action) => {
//   try {
//     const updatedTodo = API.graphql({
//       query: subscriptions.onUpdateTodo,
//     }).subscribe({
//       next: (data) => {
//         action(data.value.data.onUpdateTodo);
//       },
//       error: (error) => console.warn(error),
//     });

//     return updatedTodo;
//   } catch (err) {
//     console.error("err: ", err);
//   }
// };
