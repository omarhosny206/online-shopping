const Joi = require("joi");

exports.userProductSchema = Joi.object({
  productId: Joi.number().required(),
  price: Joi.number().required(),
});
