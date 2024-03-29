import {
  getAll as getAllTodos,
  getOne as getOneTodo,
  create as createTodo,
  update as updateTodo,
  remove as removeTodo,
  removeMany as removeManyTodos,
  updateMany as updateManyTodos,
} from "../../database/todoRepository";

export async function getTodos(ctx) {
  try {
    const todos = getAllTodos();
    ctx.body = todos;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

export async function getOne(ctx) {
  try {
    const id = ctx.params.id;
    const todo = getOneTodo({ id });

    ctx.body = {
      data: todo,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

export async function createOne(ctx) {
  try {
    const postData = ctx.request.body;

    const newTodo = createTodo(postData);
    ctx.status = 201;
    return (ctx.body = {
      data: newTodo,
      success: true,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export async function updateOne(ctx) {
  try {
    let id = ctx.params.id;
    updateTodo({ id });

    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export async function updateMany(ctx) {
  try {
    const { data } = ctx.request.body;
    updateManyTodos(data);
    ctx.body = {
      success: true,
    };
  } catch (error) {
    (ctx.status = 400),
      (ctx.body = {
        success: false,
        error: error.message,
      });
  }
}

export async function removeOne(ctx) {
  try {
    const id = ctx.params.id;
    removeTodo({ id });

    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export async function removeMany(ctx) {
  try {
    const data = ctx.request.body;
    removeManyTodos(data);
    ctx.body = {
      success: true,
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
}
