const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Files = app.db.models.Files;

    app.route('/file/:id')
        //.all(app.auth.authenticate())
        .get((req, res) => {
            Files.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(result => {
                    res.json({ code: 0, msg: '', data: result });
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })
        .put((req, res) => {
            Files.update(req.body, {
                where: { id: req.params.id }
              })
              .then(result => {
                res.json({ code: 0, msg: '删除成功！', data: result });
              })
              .catch(error => {
                res.status(412).json({ code: 412, msg: error.message });
              });
          })
          .delete((req, res) => {
            Files.destroy({ where: { id: req.params.id } })
              .then(result => {
                res.json({ code: 0, msg: '删除成功！', data: result });
              })
              .catch(error => {
                res.status(412).json({ code: 412, msg: error.message });
              });
          });

    app.route('/files')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                question_id = req.query.question_id;
                let sqlWhere = {};
                if(question_id){
                    sqlWhere.question_id = question_id;
                }
            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Files.findAndCountAll({
                where:sqlWhere,
                limit: limit,
                offset: offset
            })
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '文件列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })
        .post((req, res) => {
          Files.create(req.body)
            .then(result => {
              res.json({ code: 0, msg: '', data: result });
            })
            .catch(error => {
              res.status(412).json({ code: 412, msg: error.message });
            });
        });

};
