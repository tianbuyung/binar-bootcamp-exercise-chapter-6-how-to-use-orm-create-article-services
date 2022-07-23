"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Account.hasMany(models.Article, {
      //   foreignKey: "userId",
      // });
      models.Account.hasMany(models.Comment, {
        foreignKey: "userId",
      });
    }
  }
  Account.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "user_id",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: "created_on",
      },
      lastLogin: {
        type: DataTypes.DATE,
        field: "last_login",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: "phone_number",
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
      timestamps: false,
    }
  );
  return Account;
};
