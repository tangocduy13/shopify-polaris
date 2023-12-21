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
  const id = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
  const newTodo = {
    ...data,
    id: id,
  };
  const updatedTodos = [newTodo, ...todos];
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
}

export function update({ id }) {
  let todoId = parseInt(id);
  const index = todos.findIndex((todo) => todo.id == todoId);
  if (index !== -1) {
    const completed = todos[index].completed;
    todos[index].completed = !completed;
    return fs.writeFileSync("./src/database/todos.json", JSON.stringify(todos));
  }
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

export function remove({ id }) {
  let todoId = parseInt(id);
  const index = todos.findIndex((todo) => todo.id == todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    return fs.writeFileSync("./src/database/todos.json", JSON.stringify(todos));
  }
}

export function removeMany(array) {
  const updatedTodos = todos.filter((todo) => !array.includes(todo.id));
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
}
