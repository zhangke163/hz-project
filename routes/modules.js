module.exports = app => {
  const Modules = app.db.models.Modules;

  // 查找某个菜单下的子菜单
  function findItemChild(item, modules) {
    var arrayList = [];
    for (let i in modules) {
      if (modules[i].parent_id === item.id) {
        arrayList.push(modules[i]);
      }
    }
    return arrayList;
  }

  app.route('/module/:id')
    .get((req, res) => {
      Modules.findOne({
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          if (result) res.json(result);
          else res.sendStatus(404);
        })
        .catch(error => res.status(412).json({ msg: error.message }));
    })
    .put((req, res) => {
      Modules.update(req.body, {
          where: {
            id: req.params.id
          }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      Modules.destroy({
          where: { id: req.params.id }
        })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        })
    });

  app.route('/modules')
    .get((req, res) => {
      Modules.findAll()
        .then(result => {
          var modules = JSON.parse(JSON.stringify(result)),
            rows = [];
          for (var i = 0; i < modules.length; i++) {
            if (modules[i].parent_id === null) {
              rows.push(modules[i]);
            }
          }
          if (rows.length === 0) return res.status(412).json({ msg: 'root modules not exist!' });
          rows.map(item => {
            const childList = findItemChild(item, modules);
            if (childList.length > 0) {
              childList.map(element => {
                let arrayList = findItemChild(element, modules);
                if (arrayList.length > 0) element.list = arrayList;
              });
              item.list = childList;
            }
          });

          res.json({
            code: 0,
            msg: '',
            //删除菜单的id 和parent_id 属性，以及值为null 或'' 的属性
            data: JSON.parse(JSON.stringify(rows, (key, value) => {
              if (key === 'id' || key === 'parent_id' || !value)
                return undefined;
              else
                return value;
            }))
          });
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      Modules.create(req.body)
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });

};
