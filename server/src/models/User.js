module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
      min: 4
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 6
    }
  })
