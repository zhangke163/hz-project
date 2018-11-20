const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
  const Hydrology = app.db.models.Hydrology;

  app.route('/hydrology')
    .get((req, res) => {
      let page = parseInt(req.query.page) || 1,
        limit = parseInt(req.query.limit) || 10,
        name = req.query.name||'';
      //避免传入负数
      page = page > 0 ? page : 1;
      limit = limit > 0 ? limit : 10;

      let offset = limit * (page - 1);

      Hydrology.findAndCountAll({
          limit: limit,
          offset: offset,
          where:{
            name:{
              [Op.like]:`%${name}%`
            }
          }
        })
        .then(result => {
          res.json({
            code: 0,
            msg: '水文站',
            count: result.count,
            data: result.rows
          })
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    });

};
