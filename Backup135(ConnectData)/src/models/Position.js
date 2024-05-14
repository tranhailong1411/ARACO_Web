"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Position.init(
    {
      Name: DataTypes.STRING,
      Koutei_ID: DataTypes.STRING,
      Delay_Time: DataTypes.STRING,
      Delay_Count: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};
