const Joi = require("joi");

exports.productUpdateSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  categoryName: Joi.string().required(),
});
