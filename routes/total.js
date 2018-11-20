const eventproxy = require('eventproxy');
const Sequelize = require('sequelize');

module.exports = app => {

  const ep = new eventproxy();

  app.route('/total/count')
    .get((req, res) => {

      let district = req.query.districtId || '%%',
        data = [];

      ep.after('total_count', 5, function(pairs) {
        pairs.map(pair => {
          let o = {};
          o[pair[0]] = pair[1];
          data.push(o);
        });

        res.json({ code: 0, msg: '', data: data });
      });

      let models = [];
      models.push({ river: app.db.models.Rivers });
      models.push({ lake: app.db.models.Lakes });
      models.push({ reservoir: app.db.models.Reservoirs });
      models.push({ pool: app.db.models.Pools });
      models.push({ pond: app.db.models.Ponds });

      models.forEach(obj => {
        Object.keys(obj).forEach(key => {

          obj[key].count({
              where: {
                district_code: {
                  [Sequelize.Op.like]: district
                }
              }
            })
            .then(result => {
              ep.emit('total_count', [key, result]);
            })
            .catch(error => {
              res.status(412).json({ code: 412, msg: error.message });
            });
        });
      })

    });



};