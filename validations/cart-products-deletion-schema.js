const Joi = require("joi");

exports.cartProductsDeletionSchema = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
});
