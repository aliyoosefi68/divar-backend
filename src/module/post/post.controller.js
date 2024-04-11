const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const PostMessage = require("./post.messages");
// const HttpCodes = require("http-codes");
const { Types } = require("mongoose");
const { getAddressDetails } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require("utf8");

class PostController {
  #service;
  successMessage;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }

  async createPostPage(req, res, next) {
    try {
      const { slug } = req.query;

      let match = { parent: null };
      let showBack = false;
      let options, category;

      if (slug) {
        category = await CategoryModel.findOne({ slug });
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
        category: category?._id.toString(),
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const images = req?.files?.map((image) => image?.path?.slice(7));
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
      } = req.body;

      const { address, province, city, district } = await getAddressDetails(
        lat,
        lng
      );

      const options = removePropertyInObject(req.body, [
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);

      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }

      await this.#service.create({
        userId,
        title,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        images,
        options,
        address,
        province,
        city,
        district,
      });

      // return res.status(HttpCodes.CREATED).json({
      //   message: PostMessage.Created,
      // });
      const posts = await this.#service.find(userId);
      this.successMessage = PostMessage.Created;
      return res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }
  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find(userId);
      res.render("./pages/panel/posts.ejs", {
        posts,
        successMessage: this.successMessage,
        errorMessage: null,
      });
      this.successMessage = null;
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      this.successMessage = PostMessage.Removed;
      return res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }
  async showPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.chechExist(id);

      res.locals.layout = "./layout/website/main.ejs";
      res.render("./pages/home/post.ejs", {
        post,
      });
    } catch (error) {
      next(error);
    }
  }
  async postList(req, res, next) {
    try {
      const query = req.query;
      const posts = await this.#service.findAll(query);
      res.locals.layout = "./layout/website/main.ejs";
      res.render("./pages/home/index.ejs", {
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
