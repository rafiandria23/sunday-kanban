'use strict';

const encryptPassword = require("../helpers/encrypt-password");

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model { }

  User.init(
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          if (instance.password) {
            instance.password = encryptPassword(instance.password);
          }
        }
      },
      sequelize
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Task);
  };

  return User;
};