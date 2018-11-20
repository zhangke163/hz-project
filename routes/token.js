const jwt = require('jwt-simple');

module.exports = app => {

  const cfg = app.libs.config;
  const Users = app.db.models.Users;

  app.post('/token', (req, res) => {
    if (req.body.nickname && req.body.password) {
      const nickname = req.body.nickname;
      const password = req.body.password;

      Users.findOne({ where: { nickname: nickname } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            //console.log(user.id);
            req.session.userinfo = user; 
            const payload = { id: user.id };
            res.json({
              code: 0,
              msg: '登入成功',
              data: {
                id: user.id,
                username:user.name,
                access_token: jwt.encode(payload, cfg.jwtSecret)
              }
            });
          } else {
            res.redirect("/start/#");
          }
        })
        .catch(error => {
          res.json({ code: 401, msg: error.message });
        });
    } else {
      res.redirect("/start/#");
    }
  });
};