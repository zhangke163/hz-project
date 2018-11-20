module.exports = app => {
  const Roles = app.db.models.Roles;

  app.route('/roles')
    .get((req, res) => {
      Roles.findAndCountAll({})
        .then(result => {
          res.json({ code: 0, msg: '', count: result.count, data: result.rows });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    })
    .post((req, res) => {
      Roles.create(req.body)
        .then(result => {
          res.json({ code: 0, msg: '', data: result });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    });

  app.route('/role/:id')
    .get((req, res) => {
      Roles.findOne({
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          if (result) res.json(result);
          else res.sendStatus(404);
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .put((req, res) => {
      Roles.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          res.sendStatus(204);
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      Roles.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          res.sendStatus(204);
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
};