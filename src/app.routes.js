const { AuthRouter } = require("./module/auth/auth.routes");
const { CategoryRouter } = require("./module/category/category.routes");
const { OptionRouter } = require("./module/option/option.routes");
const { UserRouter } = require("./module/user/user.routes");

const mainRouter = require("express").Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", CategoryRouter);
mainRouter.use("/option", OptionRouter);

mainRouter.get("/", (req, res) => {
  res.render("./pages/panel/dashboard.ejs");
});

module.exports = mainRouter;
