const { Router } = require("express");
const optionController = require("./option.controller");
const router = Router();
router.post("/", optionController.create);
router.get("/category/:categoryId", optionController.findByCategoryId);
router.get("/:id", optionController.findById);
router.get("/", optionController.find);

module.exports = {
  OptionRouter: router,
};
