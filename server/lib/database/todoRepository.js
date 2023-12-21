"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.remove = remove;
exports.removeMany = removeMany;
exports.update = update;
exports.updateMany = updateMany;
var _fs = _interopRequireDefault(require("fs"));
var _todos = _interopRequireDefault(require("./todos.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getAll() {
  return _todos.default;
}
function getOne({
  id
}) {
  let todoId = parseInt(id);
  return _todos.default.find(todo => todo.id == todoId);
}
function create(data) {
  console.log(data);
  const id = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
  const newTodo = {
    ...data,
    id: id
  };
  const updatedTodos = [newTodo, ..._todos.default];
  return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
}
function update({
  id
}) {
  let todoId = parseInt(id);
  const index = _todos.default.findIndex(todo => todo.id == todoId);
  if (index !== -1) {
    const completed = _todos.default[index].completed;
    _todos.default[index].completed = !completed;
    return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(_todos.default));
  }
}
function updateMany(array) {
  const updatedTodos = _todos.default.map(todo => {
    if (array.includes(todo.id)) {
      return {
        ...todo,
        completed: !todo.completed
      }; // map return về một mảng mới
    } else return todo;
  });
  return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
}
function remove({
  id
}) {
  let todoId = parseInt(id);
  const index = _todos.default.findIndex(todo => todo.id == todoId);
  if (index !== -1) {
    _todos.default.splice(index, 1);
    return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(_todos.default));
  }
}
function removeMany(array) {
  const updatedTodos = _todos.default.filter(todo => !array.includes(todo.id));
  return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
}
//# sourceMappingURL=todoRepository.js.map