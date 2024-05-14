"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Production, {
        foreignKey: "id",
      });
    }
  }
  Location.init(
    {
      Name: DataTypes.STRING,
      Position_ID: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
