import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as todoService from "../service/todoService";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Todos in hook", todos);
  }, [todos]);

  useEffect(() => {
    const getExistingTodos = async () => {
      await fetchTodos();
    };
    getExistingTodos();
  }, []);

  useEffect(() => {
    if (todos) {
      const subscribe = async () => {
        await todoService.subscribeNewTodo(fetchTodos);
      };
      subscribe();
    }
  }, [todos]);

  async function fetchTodos() {
    try {
      const todos = await todoService.listTodos();
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(todo) {
    try {
      await todoService.addTodo(todo);
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
