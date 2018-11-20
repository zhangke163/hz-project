module.exports = (sequelize, DataType) => {
  const Questions = sequelize.define('Questions', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataType.STRING,
      allowNull: true
    },
    location: {
      type: DataType.STRING,
      allowNull: true
    },
    status: {
      type: DataType.INTEGER,
      allowNull: true
    },
    upload_time: {
      type: DataType.STRING,
      allowNull: true
    },
    handle_time: {
      type: DataType.STRING,
      allowNull: true
    },
    remark: {
      type: DataType.STRING,
      allowNull: true
    },
    patrol_id: {
      type: DataType.INTEGER,
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'tbl_question'
  });

  return Questions;
};
