const { AuthRouter } = require("./module/auth/auth.routes");
const { UserRouter } = require("./module/user/user.routes");

const mainRouter = require("express").Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);

module.exports = mainRouter;
