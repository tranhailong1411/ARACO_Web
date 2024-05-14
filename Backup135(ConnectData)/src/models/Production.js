"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Production extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Production.hasMany(models.Location, {
        foreignKey: "id",
      });
    }
  }
  Production.init(
    {
      Location_ID: DataTypes.STRING,
      Date: DataTypes.DATE,
      Shift: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Production",
    }
  );
  return Production;
};
