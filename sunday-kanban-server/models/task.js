"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Task extends Model {}

  Task.init({
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    CategoryId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  },
    { sequelize }
  )
  
  Task.associate = function (models) {
    Task.belongsTo(models.Category);
    Task.belongsTo(models.User);
  };
  
  return Task;
};
