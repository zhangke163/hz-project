const bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    enabled: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    orgnization: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    position: {
      type: DataType.STRING,
      allowNull: true
    },
    phone: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    avatar: {
      type: DataType.STRING,
      allowNull: true
    },
    district_code: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    district: {
      type: DataType.STRING
    },
    is_admin: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true
      }
    },
    picPath: {
      type: DataType.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'tbl_user',
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Roles);
  };

  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  return Users;
};
