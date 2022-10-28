const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  db: process.env.POSTGRES_DB,
  dialect: "postgres",
  query: { raw: true, plain: false, nest: true },
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbConfig;
