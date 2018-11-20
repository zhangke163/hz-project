const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const EARTH_RADIUS = 6378.137;

function rad(d) {
    return d * Math.PI / 180.0;
}

function GetDistance(long1, lat1, long2, lat2) {
    let a, b, d, sa2, sb2;
    lat1 = rad(lat1);
    lat2 = rad(lat2);
    a = lat1 - lat2;
    b = rad(long1 - long2);

    sa2 = Math.sin(a / 2.0);
    sb2 = Math.sin(b / 2.0);
    d = 2 * EARTH_RADIUS
        * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1)
            * Math.cos(lat2) * sb2 * sb2));
    return d;
}

module.exports = app => {
    const Patrols = app.db.models.Patrols;
    const Users = app.db.models.Users;
    Patrols.belongsTo(Users, { foreignKey: 'patrol_person', as: 'userObj' });
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
    app.route('/patrol/:id')
        //.all(app.auth.authenticate())
        .get((req, res) => {
            Patrols.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Users,
                    as: 'userObj'
                }]
            })
                .then(result => {
                    if (result) res.json({ code: 0, msg: '提交成功', data: result });
                    else res.sendStatus(404);
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })
        .put((req, res) => {
            let routeTemp = req.body.route || '';
            let arrLatlng = routeTemp.split('_');
            let count = arrLatlng.length;
            var length = 0;
            if (count > 1) {
                for (let i = 0; i < count - 1; i++) {
                    length += GetDistance(arrLatlng[i].split(',')[1], arrLatlng[i].split(',')[0], arrLatlng[i + 1].split(',')[1], arrLatlng[i + 1].split(',')[0])
                }
            }

            req.body.length = Math.round(length * 1000);
            Patrols.update(req.body, {
                where: { id: req.params.id }
            })
                .then(result => {
                    if (result) res.json({ code: 0, msg: '提交成功', data: result });
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })
        .delete((req, res) => {
            let id = req.params.id;
            let sql = `delete from tbl_file where question_id in (select distinct(id) from tbl_question where patrol_id='${id}')`;
            sequelize.query(sql, { type: Sequelize.QueryTypes.DELETE })
                .then(result => {
                    let sql1 = `delete from tbl_question where patrol_id = ${id};`;
                    sequelize.query(sql1, { type: Sequelize.QueryTypes.DELETE })
                        .then(result1 => {
                            let sql2 = `delete from tbl_patrol where id= ${id};`;
                            sequelize.query(sql2, { type: Sequelize.QueryTypes.DELETE })
                                .then(result2 => {
                                    res.json({ code: 0, msg: '删除成功', data: result2 });
                                })
                                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
                        })
                        .catch(error => res.status(412).json({ code: 412, msg: error.message }));
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        });


    //按月统计每个月的巡查记录的数量
    app.route('/patrols/statisticCountByMonth')
        .get((req, res) => {
            let sql = `select count(1) as count,SUBSTR((datetime(end_time,'start of month','+1 second')),0,8) as month
            from tbl_patrol GROUP BY month`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })
    //按月统计每个月的巡查记录的距离
    app.route('/patrols/statisticLengthByMonth')
        .get((req, res) => {
            let sql = `select sum(length) as length,SUBSTR((datetime(end_time,'start of month','+1 second')),0,8) as month
            from tbl_patrol GROUP BY month`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })
    //统计本月每个人的巡查距离
    app.route('/patrols/statisticMonthLength')
        .get((req, res) => {
            let sql = `select sum(p.length) as sum,u.name,u.id as userid from tbl_patrol p ,tbl_user u where p.patrol_person = u.id
            and p.end_time between datetime('now','start of month','+1 second') and 
            datetime('now','start of month','+1 month','-1 second') GROUP BY userid`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })
    //统计本月每个人的巡查次数
    app.route('/patrols/statisticMonthCount')
        .get((req, res) => {
            let sql = `SELECT
                            count(1) AS sum,
                            u.name,
                            u.id AS userid 
                        FROM
                            tbl_patrol p,
                            tbl_user u 
                        WHERE
                            p.patrol_person = u.id 
                            AND p.end_time BETWEEN datetime( 'now', 'start of month', '+1 second' ) 
                            AND datetime( 'now', 'start of month', '+1 month', '-1 second' ) 
                        GROUP BY userid`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })

    //按巡查总次数排序
    app.route('/patrols/sortByCount')
        .get((req, res) => {
            let sql = `SELECT u.*,count(1) as count FROM "tbl_patrol" p 
                    JOIN tbl_user u on p.patrol_person=u.id
                    GROUP BY patrol_person order by count desc`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })
    //按巡查总距离排序
    app.route('/patrols/sortByLength')
        .get((req, res) => {
            let sql = `SELECT u.*,SUM(length) as length  FROM "tbl_patrol" p
            JOIN tbl_user u on p.patrol_person=u.id
            GROUP BY patrol_person order by length desc`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })

    //汇总本月巡查的人数，次数和距离
    app.route('/patrols/monthAggregate')
        .get((req, res) => {
            let sql = `	select sum(length) as lengthSum,count(1) as patrolCount,count(DISTINCT(patrol_person)) as personCount from tbl_patrol WHERE end_time BETWEEN datetime( 'now', 'start of month', '+1 second' ) 
        AND datetime( 'now', 'start of month', '+1 month', '-1 second' )`
            sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ code: 0, msg: '', count: result.count, data: result })
                })
                .catch(error => res.status(412).json({ code: 412, msg: error.message }));
        })

    app.route('/patrols')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                arrange_id = req.query.arrange_id,
                patrol_person = req.query.patrol_person || '',
                sqlWhere = {
                    patrol_person: {
                        [Op.like]: '%' + patrol_person + '%'
                    }
                };
            if (arrange_id) {
                sqlWhere.arrange_id = arrange_id;
            }

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Patrols.findAndCountAll({
                where: sqlWhere,
                limit: limit,
                offset: offset,
                include: [{
                    model: Users,
                    as: 'userObj'
                }]
            })
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '巡查列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })

        .post((req, res) => {
            let routeTemp = req.body.route || '';
            let arrLatlng = routeTemp.split('_');
            let count = arrLatlng.length;
            var length = 0;
            if (count > 1) {
                for (let i = 0; i < count - 1; i++) {
                    length += GetDistance(arrLatlng[i].split(',')[1], arrLatlng[i].split(',')[0], arrLatlng[i + 1].split(',')[1], arrLatlng[i + 1].split(',')[0])
                }
            }

            req.body.length = Math.round(length * 1000);

            Patrols.create(req.body)
                .then(result => {
                    res.json({ code: 0, msg: '', data: result });
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });

};


