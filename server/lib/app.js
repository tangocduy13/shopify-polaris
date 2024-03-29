"use strict";

var _koa = _interopRequireDefault(require("koa"));
var _koaBody = _interopRequireDefault(require("koa-body"));
var _routes = _interopRequireDefault(require("./routes/routes"));
var _cors = _interopRequireDefault(require("@koa/cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = new _koa.default();
app.use((0, _cors.default)());
app.use((0, _koaBody.default)({
  parsedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(_routes.default.routes());
app.use(_routes.default.allowedMethods());
app.listen(5000, () => {
  console.log("Server are running on port 5000");
});
//# sourceMappingURL=app.js.map