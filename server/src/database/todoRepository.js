import fs from "fs";
import todos from "./todos.json";

export function getAll() {
  return todos;
}

export function getOne({ id }) {
  let todoId = parseInt(id);
  return todos.find((todo) => todo.id == todoId);
}

export function create(data) {
  console.log(data);
  const updatedTodos = [data, ...todos];
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
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
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
}

export function removeMany(array) {
  const updatedTodos = todos.filter((todo) => !array.includes(todo.id));
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
}
