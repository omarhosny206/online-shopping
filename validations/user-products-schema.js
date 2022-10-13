const Joi = require("joi");

exports.userProductsSchema = Joi.object({
  productId: Joi.number().required(),
  price: Joi.number().required(),
});
