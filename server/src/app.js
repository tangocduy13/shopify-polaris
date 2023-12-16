import Koa from "koa";
import koaBody from "koa-body";
import routes from "./routes/routes";
import cors from "@koa/cors";

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000, () => {
  console.log("Server are running on port 5000");
});
