const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/notfound.handler");
const AllExceptionHandler = require("./src/common/exception/all-exceotion.handler");
const cookieParser = require("cookie-parser");
dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT;
  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use(mainRouter);
  SwaggerConfig(app);

  NotFoundHandler(app);
  AllExceptionHandler(app);

  app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`);
  });
}

main();
