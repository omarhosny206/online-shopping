const userService = require("../services/user-service");
const roleService = require("../services/role-service");
const cartService = require("../services/cart-service");
const Roles = require("../utils/roles");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/api-error");

exports.signup = async (user) => {
  try {
    const { email, password, roleName } = user;
    const storedUser = await userService.getByEmail(email);
    const storedRole = await roleService.searchOne({ name: roleName });

    if (storedUser) {
      throw ApiError.badRequest("This email is already taken, choose another one");
    }

    if (!storedRole) {
      throw ApiError.badRequest("This role does not exist, choose from [admin, seller, customer]");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.roleId = storedRole.id;

    const savedUser = await userService.save(user);

    if (roleName === Roles.CUSTOMER) {
      await cartService.save(savedUser.id);
    }
  } catch (error) {
    throw ApiError.from(error);
  }
};
