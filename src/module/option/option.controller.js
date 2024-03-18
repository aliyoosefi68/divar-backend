const autoBind = require("auto-bind");
const optionService = require("./option.service");
const OptionMessage = require("./option.message");
const HttpCodes = require("http-codes");

class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = OptionService;
  }
  async create(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();
