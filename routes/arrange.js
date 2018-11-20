const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Arranges = app.db.models.Arranges;

    app.route('/arrange/:id')
        //.all(app.auth.authenticate())
        .get((req, res) => {
            Arranges.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(result => {
                    if (result) res.json({ code: 0, msg: '', data: result });
                    else res.sendStatus(404);
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })
        .put((req, res) => {
            Arranges.update(req.body, {
                where: { id: req.params.id }
              })
              .then(result => {
                res.sendStatus(204);
              })
              .catch(error => {
                res.status(412).json({ code: 412, msg: error.message });
              });
          })
          .delete((req, res) => {
            Arranges.destroy({ where: { id: req.params.id } })
              .then(result => {
                res.sendStatus(204);
              })
              .catch(error => {
                res.status(412).json({ code: 412, msg: error.message });
              });
          });

    app.route('/arranges')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                river_name = req.query.river_name || '',
                charge = req.query.charge || '';

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Arranges.findAndCountAll({
                where: {
                  river_name: {
                        [Op.like]: '%' + river_name + '%'
                    },
                    charge: {
                        [Op.like]: '%' + charge + '%'
                    }
                },
                limit: limit,
                offset: offset
            })
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '排班列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })

        .post((req, res) => {
          Arranges.create(req.body)
            .then(result => {
              res.json({ code: 0, msg: '', data: result });
            })
            .catch(error => {
              res.status(412).json({ code: 412, msg: error.message });
            });
        });

};
