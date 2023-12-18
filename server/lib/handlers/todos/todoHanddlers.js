"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOne = createOne;
exports.getOne = getOne;
exports.getTodos = getTodos;
exports.removeMany = removeMany;
exports.removeOne = removeOne;
exports.updateMany = updateMany;
exports.updateOne = updateOne;
var _todoRepository = require("../../database/todoRepository");
async function getTodos(ctx) {
  try {
    const todos = (0, _todoRepository.getAll)();
    ctx.body = todos;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
async function getOne(ctx) {
  try {
    const id = ctx.params.id;
    const todo = (0, _todoRepository.getOne)({
      id
    });
    ctx.body = {
      data: todo
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
async function createOne(ctx) {
  try {
    const postData = ctx.request.body;
    (0, _todoRepository.create)(postData);
    ctx.status = 201;
    return ctx.body = {
      data: postData,
      success: true
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function updateOne(ctx) {
  try {
    let id = ctx.params.id;
    (0, _todoRepository.update)({
      id
    });
    return ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function updateMany(ctx) {
  try {
    const {
      data
    } = ctx.request.body;
    (0, _todoRepository.updateMany)(data);
    ctx.body = {
      success: true
    };
  } catch (error) {
    ctx.status = 400, ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function removeOne(ctx) {
  try {
    const id = ctx.params.id;
    (0, _todoRepository.remove)({
      id
    });
    return ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function removeMany(ctx) {
  try {
    const data = ctx.request.body;
    (0, _todoRepository.removeMany)(data);
    ctx.body = {
      success: true
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}
//# sourceMappingURL=todoHanddlers.js.map