const userService = require("../services/user-service");
const roleService = require("../services/role-service");
const cartService = require("../services/cart-service");
const bcrypt = require("bcrypt");
const ResponseError = require("../utils/response-error");
const StatusCode = require("../utils/status-code");
const Roles = require("../utils/roles");

exports.signup = async (user) => {
  try {
    const { email, password, roleName } = user;
    const storedUser = await userService.getByEmail(email);
    const storedRole = await roleService.search({ name: roleName });

    if (storedUser) {
      throw ResponseError.of("This email is already taken, choose another one", StatusCode.BAD_REQUEST);
    }

    if (!storedRole) {
      throw ResponseError.of("This role does not exist, choose from [admin, seller, customer]", StatusCode.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.roleId = storedRole.id;

    const savedUser = await userService.save(user);

    if (roleName === Roles.CUSTOMER) {
      await cartService.save(savedUser.id);
    }
  } catch (error) {
    throw ResponseError.from(error);
  }
};
