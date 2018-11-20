const multiparty = require('multiparty');
const path = require('path');
module.exports = app => {
  const Users = app.db.models.Users;

  app.route('/user/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Users.findById(req.params.id, {
        attributes: { exclude: ['password'] }
      })
        .then(result => {
          res.json({ code: 0, msg: '', data: result });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    })
    .put((req, res) => {

      Users.update(req.body, {
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
      Users.destroy({ where: { id: req.params.id } })
        .then(result => {
          res.sendStatus(204);
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    });


  app.route('/users')
    .get((req, res) => {
      let page = parseInt(req.query.page) || 1,
        limit = parseInt(req.query.limit) || 10;

      //避免传入负数
      page = page > 0 ? page : 1;
      limit = limit > 0 ? limit : 10;

      let offset = limit * (page - 1);

      Users.findAndCountAll({
        attributes: {
          exclude: ['password']
        },
        limit: limit,
        offset: offset
      })
        .then(result => {
          res.json({ code: 0, msg: '', count: result.count, data: result.rows });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    })
    .post((req, res) => {
      Users.create(req.body, {
        attributes: {
          exclude: ['password']
        }
      })
        .then(result => {
          res.json({ code: 0, msg: '', data: result });
        })
        .catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
    });

  app.route('/oploadUserPic')
    .post((req, res) => {
      const form = new multiparty.Form();
      const uploadUrl = app.libs.config.uploadUrl;
      const uploadPath = app.libs.config.uploadPath;
      form.uploadDir = path.resolve(uploadPath);
      form.parse(req, function (err, fields, files) {
        let obj = {};
        Object.keys(fields).forEach(function (name) {
          obj[name] = fields[name][0];
        });
        //上传头像只有一张图片
        filepath = files.file[0].path;
        tempArr = filepath.split('\\');
        filename = tempArr[tempArr.length - 1];
        filepath = uploadUrl + filename;
        obj.picPath = filepath;
        Users.update(obj, {
          where: { id: obj.id }
        }).then(result => {
          console.log(result);
          res.json({
            code: 0,
            msg: '更新成功',
            url: filepath
          });
        }).catch(error => {
          res.status(412).json({ code: 412, msg: error.message });
        });
      });
    });

  app.route('/checkLogin')
    .get((req, res) => {
      //console.log(req.session);
      console.log('------------------------');
      res.json({
        "code": 0,
         "msg": "",
         "data": req.session.userinfo
      })
    });

};
