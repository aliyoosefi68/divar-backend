const autoBind = require("auto-bind");
const OptionModel = require("./option.model");

class OptionService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
  }
  //find my categories
  async find() {}

  //for create new option
  async create(optionDto) {}

  async checkExistById(id) {}
}

module.exports = new OptionService();
