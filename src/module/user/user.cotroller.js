const NodeEnv = require("../../common/constant/env.enum");
const { UserMessages } = require("./user.messages");
const userSrvice = require("./user.service");
const autoBind = require("auto-bind");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userSrvice;
  }
  async whoami(req, res, next) {
    try {
      const user = req.user;
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
