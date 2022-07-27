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
      models.Account.hasMany(models.AddressUser, {
        foreignKey: "userId",
      });
    }
  }
  Account.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      lastLogin: { type: DataTypes.DATE, field: "last_login" },
      phoneNumber: {
        type: DataTypes.STRING,
        field: "phone_number",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    }
  );
  return Account;
};
