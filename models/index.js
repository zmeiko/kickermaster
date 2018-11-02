"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var configs = require("../sequelizeConfig.js");

var env = process.env.NODE_ENV || "development";
var config = configs[env];
var basename = path.basename(__filename);
var db = {};

var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const { createContext, EXPECTED_OPTIONS_KEY } = require("dataloader-sequelize");

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// optimization count of query to database
createContext(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
