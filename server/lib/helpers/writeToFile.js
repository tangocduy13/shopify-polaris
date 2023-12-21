"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeToFile;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function writeToFile(data) {
  return _fs.default.writeFileSync("./lib/database/todos.json", JSON.stringify(data));
}
//# sourceMappingURL=writeToFile.js.map