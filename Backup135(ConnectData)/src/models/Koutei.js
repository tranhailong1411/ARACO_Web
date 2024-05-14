"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Koutei extends Model {
    // ...
    static associate(models) {
      // define association here
    }
  }
  Koutei.init(
    {
      Koutei_ID: DataTypes.STRING,
      Delay_Time: DataTypes.STRING,
      Delay_Count: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Koutei",
    }
  );
  return Koutei;
};
