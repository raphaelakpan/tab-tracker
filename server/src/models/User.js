const bcrypt = require('bcrypt-nodejs')

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user._changed.password) {
    return
  }

  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User
}
