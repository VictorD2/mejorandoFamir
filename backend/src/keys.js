const config = require("./config");
module.exports = {
  database: {
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    database: config.DATABASE_NAME,
    password:config.PASSWORD,
    dateStrings: true,
    port: config.PORT,
  },
};
