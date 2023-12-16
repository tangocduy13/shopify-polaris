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
  console.log(data)
  const updatedTodos = [data, ...todos];
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
}

export function update({ id }) {
  let todoId = parseInt(id);
  const index = todos.findIndex((todo) => todo.id == todoId);
  if (index !== -1) {
    const completed = todos[index].completed
    todos[index].completed = !completed;
    return fs.writeFileSync("./src/database/todos.json", JSON.stringify(todos));
  }
}

export function remove({ id }) {
  let todoId = parseInt(id);
  const index = todos.findIndex((todo) => todo.id == todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    return fs.writeFileSync("./src/database/todos.json", JSON.stringify(todos));
  }
}
