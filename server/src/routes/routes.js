import Router from "koa-router";
import * as todoHandlers from "../handlers/todos/todoHanddlers";
import todoMiddleware from "../middleware/todoMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/todos", todoHandlers.getTodos);
router.get("/todos/:id", todoHandlers.getOne);
router.post("/todos", todoMiddleware, todoHandlers.createOne);
router.patch("/todos/:id", todoHandlers.updateOne);
router.patch("/todos", todoHandlers.updateMany);
router.delete("/todos/:id", todoHandlers.removeOne);
router.delete("/todos", todoHandlers.removeMany);

export default router;
