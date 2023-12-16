import Router from "koa-router";
import * as todoHandlers from "../handlers/todos/todoHanddlers";
import todoMiddleware from "../middleware/todoMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/todos", todoHandlers.getTodos);
router.get("/todos/:id", todoHandlers.getOne);
router.post("/todos", todoMiddleware, todoHandlers.createOne);
router.put("/todos/:id", todoHandlers.updateOne);
router.delete("/todos/:id", todoHandlers.removeOne);

export default router;
