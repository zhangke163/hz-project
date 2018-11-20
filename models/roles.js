module.exports = (sequelize, DataType) => {
  const Roles = sequelize.define('Roles', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'tbl_role'
  });

  Roles.associate = (models) => {
    Roles.hasMany(models.Users);
    Roles.belongsToMany(models.Modules, { through: 'rel_role_module' });
  };

  return Roles;
};
