const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const userProductRoute = require("./routes/user-product-route");
const cartRoute = require("./routes/cart-route");
const cartItemRoute = require("./routes/cart-item-route");
const orderRoute = require("./routes/order-route");
const categoryRoute = require("./routes/category-route");
const roleRoute = require("./routes/role-route");
const signupRoute = require("./routes/signup-route");
const loginRoute = require("./routes/login-route");

const notFoundHandler = require("./middlewares/not-found-handler");
const errorHandler = require("./middlewares/error-handler");

const sequelize = require("./config/sequelize-config");
const association = require("./config/association-config");

const PORT = process.env.PORT;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/user-products", userProductRoute);
app.use("/carts", cartRoute);
app.use("/cart-products", cartItemRoute);
app.use("/orders", orderRoute);
app.use("/categories", categoryRoute);
app.use("/roles", roleRoute);

app.use(notFoundHandler.handle);
app.use(errorHandler.handle);

sequelize.sync();
association.create();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
