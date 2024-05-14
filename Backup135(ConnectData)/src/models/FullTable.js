"use strict";
const { Model } = require("sequelize");
const Koutei = require("./Koutei");
module.exports = (sequelize, DataTypes) => {
  class FullTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  FullTable.init(
    {
      Location: DataTypes.STRING,
      Date: DataTypes.DATEONLY,
      Shift: DataTypes.STRING,
      Position: DataTypes.STRING,
      Koutei: DataTypes.STRING,
      DelayTime: DataTypes.STRING,
      DelayCount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FullTable",
    }
  );
  return FullTable;
};
