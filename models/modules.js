module.exports = (sequelize, DataType) => {
  const Modules = sequelize.define('Modules', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    icon: {
      type: DataType.STRING,
      allowNull: true
    },
    jump: {
      type: DataType.STRING,
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'tbl_module'
  });

  Modules.associate = (models) => {
    Modules.belongsTo(models.Modules, { foreignKey: 'parent_id', targetKey: 'id' });
    Modules.belongsToMany(models.Roles, { through: 'rel_role_module' });
  };

  return Modules;
};
