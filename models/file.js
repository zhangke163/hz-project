module.exports = (sequelize, DataType) => {
  const Files = sequelize.define('Files', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: {
      type: DataType.STRING,
      allowNull: true
    },
    upload_time: {
      type: DataType.STRING,
      allowNull: true
    },
    question_id: {
      type: DataType.INTEGER,
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'tbl_file'
  });

  return Files;
};
