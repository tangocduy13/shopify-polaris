import fs from "fs";
import todos from "./todos.json";
import writeToFile from "../helpers/writeToFile";

export function getAll() {
  return todos;
}

export function getOne({ id }) {
  let todoId = parseInt(id);
  return todos.find((todo) => todo.id == todoId);
}

export function create(data) {
  const id = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
  const newTodo = {
    ...data,
    id: id,
  };
  const updatedTodos = [newTodo, ...todos];
  writeToFile(updatedTodos);
  return newTodo; // trả dữ liệu lên FE để thêm mới vào todo list
}

export function updateMany(array) {
  const updatedTodos = todos.map((todo) => {
    if (array.includes(todo.id)) {
      return {
        ...todo,
        completed: !todo.completed,
      }; // map return về một mảng mới
    } else return todo;
  });
  writeToFile(updatedTodos);
}

export function removeMany(array) {
  const updatedTodos = todos.filter((todo) => !array.includes(todo.id));
  writeToFile(updatedTodos);
}
