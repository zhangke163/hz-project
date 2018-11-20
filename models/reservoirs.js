module.exports = (sequelize, DataType) => {
  const Reservoirs = sequelize.define('Reservoirs', {
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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    storage: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    catch_area: {
      type: DataType.DECIMAL(10, 2),
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
    district_code: {
      type: DataType.STRING,
      allowNull: false
    },
    district:{
      type: DataType.STRING
    }
  }, {
      timestamps: false,
    tableName: 'tbl_reservoir'
  });

  return Reservoirs;
};
