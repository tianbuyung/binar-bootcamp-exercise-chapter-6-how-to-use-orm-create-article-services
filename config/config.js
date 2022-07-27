require("dotenv").config();

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "123456",
    database: "testing_database_orm_development",
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  test: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "admin",
    database: "testing_database_orm_staging",
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  production: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "admin",
    database: "testing_database_orm_production",
    host: DATABASE_HOST,
    dialect: "postgres",
  },
};
