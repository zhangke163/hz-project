module.exports = (sequelize, DataType) => {
  const Quality = sequelize.define('Quality', {
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
    river: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    zone: {
      type: DataType.STRING
    },
    build_year: {
      type: DataType.STRING
    },
    estimate_length: {
      type: DataType.STRING
    },
    estimate_area: {
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
    tableName: 'tbl_quality'
  });

  return Quality;
};
