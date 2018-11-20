module.exports = (sequelize, DataType) => {
  const Patrols = sequelize.define('Patrols', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    river_name: {
      type: DataType.INTEGER,
      allowNull: true
    },
    arrange_id: {
      type: DataType.INTEGER,
      allowNull: true
    },
    start_time: {
      type: DataType.STRING,
      allowNull: true
    },
    end_time: {
      type: DataType.STRING,
      allowNull: true
    },
    start: {
      type: DataType.STRING,
      allowNull: true
    },
    end: {
      type: DataType.STRING,
      allowNull: true
    },
    status: {
      type: DataType.STRING,
      allowNull: true
    },
    patrol_person: {
      type: DataType.INTEGER,
      field: 'patrol_person',
      references: {
          // 引用User
          model: 'Users',
          // 连接模型的列
          key: 'id'
      }
  },
    remark: {
      type: DataType.STRING,
      allowNull: true
    },
    route: {
      type: DataType.STRING,
      allowNull: true
    },
    length: {
      type: DataType.STRING,
      allowNull: true
    }
  }, {
      timestamps: false,
    tableName: 'tbl_patrol'
  });

  return Patrols;
};
