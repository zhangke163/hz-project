module.exports = (sequelize, DataType) => {
  const Hydrology = sequelize.define('Hydrology', {
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
      }
    },
    build_year: {
      type: DataType.STRING
    },
    target: {
      type: DataType.STRING
    },
    longitude: {
      type: DataType.DECIMAL(11, 7)
    },
    latitude: {
      type: DataType.DECIMAL(11, 8)
    }
  }, {
      timestamps: false,
    tableName: 'tbl_hydrology'
  });

  return Hydrology;
};
