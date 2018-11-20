const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = null;

module.exports = app => {
  if (!db) {
    const config = app.libs.config;
    const sequelize = new Sequelize(config.database, config.username, config.password, config.params);
    db = { sequelize, models: {} };
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });
    Object.keys(db.models).forEach(key => {
      let model = db.models[key];
      if (model.hasOwnProperty('associate')) {
        model.associate(db.models);
      }
    });
  }
  return db;
};