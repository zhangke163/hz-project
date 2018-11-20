const express = require('express');
const consign = require('consign');
const session = require('express-session');
// var engines = require('consolidate');
// var path = require('path');
const app = express();
app.use(session({
  secret: "zhd",  //加密session
  cookie: { maxAge: 60 * 1000 * 300 }, //设置过期时间
  resave: true,  //强制保存session 默认为 true，建议设置成false
  saveUninitialized: false ////强制将未初始化的session存储 默认为true，建议设置成true
}));

// app.use('*/user/login',function (req, res) {
  
// });


// app.engine('html', engines.mustache);
// app.set('view engine', 'html');
// app.use(function (req, res, next) {
//   if (req.session.userinfo) {
//     next();
//   } else {
//     res.redirect("/start/#/user/login");
//   }
// });

consign({ verbose: false })
  .include('libs/config.js')
  .then('db.js')
  .then('auth.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app);




module.exports = app;