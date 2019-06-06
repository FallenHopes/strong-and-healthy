'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    nick: DataTypes.STRING,
    mess: DataTypes.STRING,
    date: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};