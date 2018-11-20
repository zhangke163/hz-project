const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Rivers = app.db.models.Rivers;

    app.get('/river/district/name', (req, res) => {
        let name = req.query.name,
            district_code = req.query.district_code;

        Rivers.findOne({
            where: {
                name: name,
                district_code: district_code
            }
        }).then(result => {
            res.json({ code: 0, msg: '', data: result });
        })
            .catch(error => {
                res.json({ code: 412, msg: '' });
            });
    });

    app.get('/rivers/district/:districtId', (req, res) => {
        let page = parseInt(req.query.page) || 1,
            limit = parseInt(req.query.limit) || 10,
            name = req.query.name || '',
            district = req.query.district || '';

        //避免传入负数
        page = page > 0 ? page : 1;
        limit = limit > 0 ? limit : 10;

        let offset = limit * (page - 1);

        Rivers.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                },
                district: {
                    [Op.like]: '%' + district + '%'
                }
            },
            limit: limit,
            offset: offset
        })
            .then(result => {
                res.json({
                    code: 0,
                    msg: '',
                    count: result.count,
                    data: result.rows
                })
            })
            .catch(error => {
                res.status(412).json({ code: 412, msg: error.message });
            });

    });


    app.route('/river/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Rivers.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(result => {
                    if (result) res.json({ code: 0, msg: '', data: result });
                    else res.sendStatus(404);
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });

    app.route('/rivers')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                name = req.query.name || '',
                district = req.query.district || '',
                district_code = req.query.district_code || '';

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Rivers.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: '%' + name + '%'
                    },
                    district_code: {
                        [Op.like]: '%' + district_code + '%'
                    },
                    district: {
                        [Op.like]: '%' + district + '%'
                    }
                    //过滤掉了合并之后的河流
                    ,
                    district_code:{
                        [Op.ne] :0
                    },
                    crosses:{
                        [Op.is] :null
                    }
                },
                attributes: {
                    exclude: ['created_at', 'updated_at']
                },
                limit: limit,
                offset: offset
            })
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '河道列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });


        app.route('/rivers/findByMultiField')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                param = req.query.name || '';

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Rivers.findAndCountAll({
                where: {
                    [Op.or]:[
                        {
                            district: {
                                [Op.like]: '%' + param + '%'
                            }
                        },
                        {
                            level_name: {
                                [Op.like]: '%' + param + '%'
                            }
                        },{
                            name: {
                                [Op.like]: '%' + param + '%'
                            }
                        }
                    ],
                    district_code:{
                        [Op.ne] :0
                    },
                    crosses:{
                        [Op.is] :null
                    }
                },
                attributes: {
                    exclude: ['created_at', 'updated_at']
                },
                limit: limit,
                offset: offset
            })
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '河道列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });

};
