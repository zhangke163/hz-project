module.exports = (sequelize, DataType) => {
  const Dicts = sequelize.define('Dicts', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      unique: true
    },
    cipher: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      unique: true
    }
  }, {
    tableName: 'tbl_dict'
  });

  return Dicts;
};
