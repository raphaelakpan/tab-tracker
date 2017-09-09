const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || "development"
const config = require('../config/config')[env]
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config.options
)

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model
  })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db
