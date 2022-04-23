import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getExistingTodos = async () => {
      const tds = await fetchTodos();
      setTodos(tds);
    };
    getExistingTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(todo) {
    try {
      setTodos([...todos, todo]);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return {
    todos,
    setTodos,
    fetchTodos,
    addTodo,
  };
};

export default useTodos;
