const { AuthRouter } = require("./module/auth/auth.routes");
const { CategoryRouter } = require("./module/category/category.routes");
const { UserRouter } = require("./module/user/user.routes");

const mainRouter = require("express").Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", CategoryRouter);

module.exports = mainRouter;
