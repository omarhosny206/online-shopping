const Joi = require("joi");

exports.orderItemSchema = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});
