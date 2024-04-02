const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const PostMessage = require("./post.messages");

class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }

  async createPostPage(req, res, next) {
    try {
      const { slug } = req.query;

      let match = { parent: null };
      let showBack = false;
      let options;

      if (slug) {
        const category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length == 0) options = null;
        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([{ $match: match }]);

      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        options,
      });
    } catch (error) {
      next(error);
    }
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
  async remove(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
