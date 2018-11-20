const Sequelize = require('sequelize');
module.exports = app => {
  const Overall = app.db.models.Overall;
    const Op = Sequelize.Op;
  app.route('/overall/:id')
    .get((req, res) => {
      Overall.findOne({
          where: { id: req.params.id }
        })
        .then(result => {
          if (result) res.json(result);
          else res.sendStatus(404);
        })
        .catch(error => res.status(412).json({ msg: error.message }));
    })
    .put((req, res) => {
      Overall.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
    })
    .delete((req, res) => {
      Overall.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
    });

  app.route('/overalls')
    .get((req, res) => {
      let page = parseInt(req.query.page) || 1,
        limit = parseInt(req.query.limit) || 10,
        name = req.query.name || '',
        address = req.query.address || '';
      //避免传入负数
      page = page > 0 ? page : 1;
      limit = limit > 0 ? limit : 10;

      let offset = limit * (page - 1);
      Overall.findAndCountAll({
          where: {
              name: {
                  [Op.like]: '%' + name + '%'
              },
              address: {
                  [Op.like]: '%' + address + '%'
              }
          },
          limit: limit,
          offset: offset
        })
        .then(result => res.json({ code: 0, msg: '', count: result.count, data: result.rows }))
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })
    .post((req, res) => {
      Overall.create(req.body)
        .then(result => {
          res.json({ code: 0, msg: '', data: result });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    });

};
