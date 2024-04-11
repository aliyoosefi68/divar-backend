const { AuthRouter } = require("./module/auth/auth.routes");
const { CategoryRouter } = require("./module/category/category.routes");
const { OptionRouter } = require("./module/option/option.routes");
const { PostRouter } = require("./module/post/post.routes");
const { UserRouter } = require("./module/user/user.routes");
const postController = require("./module/post/post.controller");

const mainRouter = require("express").Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", CategoryRouter);
mainRouter.use("/option", OptionRouter);
mainRouter.use("/post", PostRouter);

mainRouter.get("/", postController.postList);
mainRouter.get("/panel", (req, res) => {
  res.render("./pages/panel/dashboard.ejs");
});
mainRouter.get("/auth/login", (req, res) => {
  res.locals.layout = "./layout/auth/main.ejs";
  res.render("./pages/auth/login.ejs");
});

module.exports = mainRouter;
