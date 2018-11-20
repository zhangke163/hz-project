const logger = require('./logger');

module.exports = {
  database: 'huzhou',
  username: 'lee',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'huzhou.sqlite',
    operatorsAliases: false,
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: 'Nta$K-Ap1',
  jwtSession: { session: false },
  //一定要配置为外网地址可以访问的
  uploadUrl:'http://localhost:8000/dist/upload/',
  //文件系统中upload的目录
  uploadPath:'H:\\nodejs\\huzhou47\\public\\dist\\upload'
};