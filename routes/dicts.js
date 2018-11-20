const Sequelize = require('sequelize');
module.exports = app => {
  const Dicts = app.db.models.Dicts;
    const Op = Sequelize.Op;
  app.route('/dict/:id')
    .get((req, res) => {
      Dicts.findOne({
          where: { id: req.params.id }
        })
        .then(result => {
          if (result) res.json(result);
          else res.sendStatus(404);
        })
        .catch(error => res.status(412).json({ msg: error.message }));
    })
    .put((req, res) => {
      Dicts.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
    })
    .delete((req, res) => {
      Dicts.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
    });

  app.route('/dicts')
    .get((req, res) => {
      let page = parseInt(req.query.page) || 1,
        limit = parseInt(req.query.limit) || 10,
        name = req.query.name || '',
        cipher = req.params.cipher || '';
      //避免传入负数
      page = page > 0 ? page : 1;
      limit = limit > 0 ? limit : 10;

      let offset = limit * (page - 1);
      Dicts.findAndCountAll({
          where:{
              name:{
                  [Op.like]: '%' + name + '%'
              },
              cipher:{
                  [Op.like]: '%'+cipher+'%'
              }
          },
          limit: limit,
          offset: offset,
          order: [
            ['type', 'ASC'],
            ['id', 'ASC']
          ]
        })
        .then(result => res.json({ code: 0, msg: '', count: result.count, data: result.rows }))
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })
    .post((req, res) => {
      Dicts.create(req.body)
        .then(result => {
          res.json({ code: 0, msg: '', data: result });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    });

};
