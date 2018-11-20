module.exports = (sequelize, DataType) => {
  const Lakes = sequelize.define('Lakes', {
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
    basin: {
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
    cross: {
      type: DataType.STRING,
      allowNull: true
    },
    function: {
      type: DataType.STRING,
      allowNull: true
    },
    remark: {
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
    tableName: 'tbl_lake'
  });

  return Lakes;
};
