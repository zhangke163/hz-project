const Sequelize = require('sequelize');
const multiparty = require('multiparty');
const path = require('path');
const uuid = require('node-uuid');

module.exports = app => {
  const sequelize = new Sequelize('huzhou', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // SQLite only
    storage: 'huzhou.sqlite',
    operatorsAliases: false
  });
  app.route('/projectCount')
    .get((req, res) => {
      let sql = `select '河流' as name,count(1) as length from tbl_river
      UNION
      select '湖漾' as name, count(1) as length from tbl_lake
      UNION
      select '山塘' as name, count(1) as length from tbl_pool
      UNION
      select '池塘' as name, count(1) as length from tbl_pond
      UNION
      select '水库' as name, count(1) as length from tbl_reservoir`
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })

    app.route('/allProjectCount')
    .get((req, res) => {
      let sql = `
      select '河道总量' as name,count(1) as count, 1 as s from tbl_river
      UNION
      select '省级河道' as name,count(1) as count, 2 as s from tbl_river where level_name = '省级'
      UNION
      select '市级河道' as name, count(1) as count, 3 as s from tbl_river where level_name = '市级'
      UNION
      select '区级河道' as name, count(1) as count, 4 as s from tbl_river where level_name = '区级'
      UNION
      select '区级以下河道' as name, count(1) as count, 5 as s from tbl_river where level_name  not in ('省级','市级','区级')
      UNION
      select '水库' as name, count(1) as count, 6 as s from tbl_reservoir
      UNION
      select '湖漾' as name, count(1) as count, 7 as s from tbl_lake
      UNION
      select '山塘' as name, count(1) as count, 8 as s from tbl_pool
      UNION
      select '池塘' as name, count(1) as count, 9 as s from tbl_pond
			order by s`
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })

    app.route('/groupByCounty')
    .get((req, res) => {
      var table = req.query.table||'tbl_river';
      let sql = `SELECT '市本级' as name,COUNT(1) as count,1 as s FROM tbl_river where district_code = '0' and crosses is NOT NULL
      UNION
      SELECT '吴兴区' as name,COUNT(1) as count,2 as s FROM tbl_river where district_code like '100%' and crosses is NOT NULL
      UNION
      SELECT '南浔区' as name,COUNT(1) as count,3 as s FROM tbl_river where district_code like '200%' and crosses is NOT NULL
      UNION
      SELECT '开发区' as name,COUNT(1) as count,4 as s FROM tbl_river where district_code like '200%' and crosses is NOT NULL
      UNION
      SELECT '度假区' as name,COUNT(1) as count,5 as s FROM tbl_river where district_code like '400%' and crosses is NOT NULL
			order by s`
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          res.setHeader('Cache-Control','no-cache');
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })

    app.route('/pool/groupByType')
    .get((req, res) => {
      let sql = `select type as name,count(1) as value from tbl_pool GROUP BY type`
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })

    app.route('/reservoir/groupByType')
    .get((req, res) => {
      let sql = `select type as name,count(1) as value from tbl_reservoir GROUP BY type`
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    })

  app.route('/river/groupByLevel')
    .get((req, res) => {
      let sql = `select level_name,count(1) as count from tbl_river GROUP BY level_name`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/river/groupByDistrict')
    .get((req, res) => {
      let sql = `select district,count(1) as count from tbl_river GROUP BY district`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    //湖漾按行政区划统计
    app.route('/lake/groupByDistrict')
    .get((req, res) => {
      let sql = `select district,count(1) as count from tbl_lake GROUP BY district`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/waterProject/groupByTown')
    .get((req, res) => {
      var table = req.query.table||'tbl_river';
      var town = req.query.town||'吴兴区';
      let sql = `select district,count(1) from ${table} where district_code like ''||(select SUBSTR(cipher,0,4) from tbl_dict 
      where name = '${town}' )||'%' and district_code !=(select cipher from tbl_dict where name = '${town}' ) group by district`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/reservoir/groupByDistrict')
    .get((req, res) => {
      let sql = `select district,count(1) as count from tbl_reservoir GROUP BY district`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/reservoir/groupByType')
    .get((req, res) => {
      let sql = `select type,count(1) as count from tbl_reservoir GROUP BY type`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/pool/groupByType')
    .get((req, res) => {
      let sql = `select type,count(1) as count from tbl_pool GROUP BY type`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/pool/groupByDistrict')
    .get((req, res) => {
      let sql = `select district,count(1) as count from tbl_pool GROUP BY district`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });

    app.route('/pond/groupByDistrict')
    .get((req, res) => {
      let sql = `select district,count(1) as count from tbl_pond GROUP BY district`;
      sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result);
          res.json({ code: 0, msg: '', count: result.count, data: result })
        })
        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
    });
};


