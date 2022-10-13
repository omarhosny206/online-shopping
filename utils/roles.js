const Roles = Object.freeze({
  CUSTOMER: "customer",
  SELLER: "seller",
  ADMIN: "admin",
  ALL: ["admin", "seller", "customer"],
});

module.exports = Roles;
