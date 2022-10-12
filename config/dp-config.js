const dbConfig = {
  host: "localhost",
  user: "postgres",
  password: "password",
  db: "online_shopping",
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
