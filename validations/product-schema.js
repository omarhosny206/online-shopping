const Joi = require("joi");

exports.productSchema = Joi.object({
  name: Joi.string().required(),
  categoryName: Joi.string().required(),
});
