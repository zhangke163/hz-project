const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
  const Ponds = app.db.models.Ponds;

  app.route('/ponds')
    .get((req, res) => {
      let page = parseInt(req.query.page) || 1,
        limit = parseInt(req.query.limit) || 10,
        district = req.query.district||'',
        district_code = req.query.district_code||'',
        name = req.query.name||'',
        offset = limit * (page - 1);
      

      Ponds.findAndCountAll({
          offset: offset,
          limit: limit,
          where: {
            name:{
              [Op.like]:`%${name}%`,
            },
            district:{
              [Op.like]:`%${district}%`,
            },
            district_code:{
              [Op.like]:`%${district_code}%`,
            }
          }
        })
        .then(result => res.json({
          code: 0,
          msg: '池塘列表',
          count: result.count,
          data: result.rows
        }))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      Ponds.create(req.body)
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });;

};