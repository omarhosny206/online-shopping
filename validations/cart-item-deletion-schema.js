const Joi = require("joi");

exports.cartItemDeletionSchema = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
});
