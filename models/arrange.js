module.exports = (sequelize, DataType) => {
  const Arranges = sequelize.define('Arranges', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    river_name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    start: {
      type: DataType.STRING,
      allowNull: false
    },
    end: {
      type: DataType.STRING,
      allowNull: false
    },
    charge: {
      type: DataType.STRING,
      allowNull: false
    },
    tel: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {
      timestamps: false,
    tableName: 'tbl_arrange'
  });

  return Arranges;
};
