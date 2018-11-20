const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = app => {
  const Users = app.db.models.Users;
  const cfg = app.libs.config;

  const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter('access_token'), ExtractJwt.fromHeader('access_token'), ExtractJwt.fromBodyField('access_token')])
  };
  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if (user) { return done(null, { id: user.id }); }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};