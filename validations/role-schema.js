const Joi = require("joi");

exports.roleSchema = Joi.object({
  name: Joi.string().required(),
});
