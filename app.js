const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koaStatic = require("koa-static");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(historyApiFallback({ index: "index.html" }));
app.use(koaStatic(__dirname + "/public"));
app.use(koaStatic(__dirname + "/public/monge"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
