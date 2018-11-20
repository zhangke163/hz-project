module.exports = (sequelize, DataType) => {
  const Pools = sequelize.define('Pools', {
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
    type: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    admin_village: {
      type: DataType.STRING,
      allowNull: true
    },
    nature_village: {
      type: DataType.STRING,
      allowNull: true
    },
    area: {
      type: DataType.DECIMAL(10, 2),
      allowNull: true
    },
    storage: {
      type: DataType.DECIMAL(10, 2),
      allowNull: true
    },
    catch_area: {
      type: DataType.DECIMAL(10, 2),
      allowNull: true
    },
    dam_height: {
      type: DataType.DECIMAL(10, 2),
      allowNull: true
    },
    dam_length: {
      type: DataType.DECIMAL(10, 2),
      allowNull: true
    },
    house: {
      type: DataType.INTEGER,
      allowNull: true
    },
    people: {
      type: DataType.INTEGER,
      allowNull: true
    },
    road: {
      type: DataType.STRING,
      allowNull: true
    },
    spillway: {
      type: DataType.STRING,
      allowNull: true
    },
    build_year: {
      type: DataType.STRING,
      allowNull: true
    },
    standard_year: {
      type: DataType.STRING,
      allowNull: true
    },
    standard: {
      type: DataType.STRING,
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
    tableName: 'tbl_pool'
  });

  return Pools;
};
