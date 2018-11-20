module.exports = (sequelize, DataType) => {
  const Rivers = sequelize.define('Rivers', {
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
    },
    length: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    crosses: {
      type: DataType.STRING,
      allowNull: true
    },
    level_name: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    area_now: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    storage_now: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    area_aim: {
      type: DataType.STRING,
      allowNull: true
    },
    storage_aim: {
      type: DataType.STRING,
      allowNull: true
    },
    start_location: {
      type: DataType.STRING,
      allowNull: true
    },
    start_lng: {
      type: DataType.STRING,
      allowNull: true
    },
    start_lat: {
      type: DataType.STRING,
      allowNull: true
    },
    ending_location: {
      type: DataType.STRING,
      allowNull: true
    },
    ending_lng: {
      type: DataType.STRING,
      allowNull: true
    },
    ending_lat: {
      type: DataType.STRING,
      allowNull: true
    },
    function: {
      type: DataType.STRING,
      allowNull: true
    },
    remark: {
      type: DataType.TEXT,
      allowNull: true
    },
    district_code: {
      type: DataType.STRING,
      allowNull: false
    },
    district: {
      type: DataType.STRING
    }
  }, {
      timestamps: false,
    tableName: 'tbl_river'
  });

  return Rivers;
};
