"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.removeMany = removeMany;
exports.updateMany = updateMany;
var _fs = _interopRequireDefault(require("fs"));
var _todos = _interopRequireDefault(require("./todos.json"));
var _writeToFile = _interopRequireDefault(require("../helpers/writeToFile"));
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
  const id = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
  const newTodo = {
    ...data,
    id: id
  };
  const updatedTodos = [newTodo, ..._todos.default];
  (0, _writeToFile.default)(updatedTodos);
  return newTodo; // trả dữ liệu lên FE để thêm mới vào todo list
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
  (0, _writeToFile.default)(updatedTodos);
}
function removeMany(array) {
  const updatedTodos = _todos.default.filter(todo => !array.includes(todo.id));
  (0, _writeToFile.default)(updatedTodos);
}
//# sourceMappingURL=todoRepository.js.map