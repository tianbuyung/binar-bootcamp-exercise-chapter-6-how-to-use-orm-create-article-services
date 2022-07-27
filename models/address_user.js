"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AddressUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.AddressUser.belongsTo(models.Account, {
        foreignKey: "userId",
      });
    }
  }
  AddressUser.init(
    {
      userId: { type: DataTypes.INTEGER, field: "user_id" },
      alamat: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
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
      modelName: "AddressUser",
      tableName: "address_users",
    }
  );
  return AddressUser;
};
