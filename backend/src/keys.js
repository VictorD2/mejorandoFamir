const config = require("./config");
module.exports = {
  database: {
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    database: config.DATABASE_NAME,
    password: config.PASSWORD,
    dateStrings: true,
    port: config.PORT,
    connectionLimit: 100,
    timeout: 60 * 60 * 1000,
  },
};
