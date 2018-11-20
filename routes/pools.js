const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Pools = app.db.models.Pools;

    app.get('/pool/district/name', (req, res) => {
        let name = req.query.name,
            district_code = req.query.district_code;

        Pools.findOne({
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

    app.route('/pools')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                district = req.query.district || '',
                district_code = req.query.district_code || '',
                name = req.query.name || '',
                offset = limit * (page - 1);


            Pools.findAndCountAll({
                offset: offset,
                limit: limit,
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                    district: {
                        [Op.like]: `%${district}%`,
                    },
                    district_code: {
                        [Op.like]: `%${district_code}%`,
                    }
                }
            })
                .then(result => res.json({
                    code: 0,
                    msg: '山塘列表',
                    count: result.count,
                    data: result.rows
                }))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Pools.create(req.body)
                .then(result => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

        app.route('/pools/findByMultiField')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                param = req.query.name || '';

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Pools.findAndCountAll({
                where: {
                    [Op.or]:[
                        {
                            district: {
                                [Op.like]: '%' + param + '%'
                            }
                        },
                        {
                            type: {
                                [Op.like]: '%' + param + '%'
                            }
                        },{
                            name: {
                                [Op.like]: '%' + param + '%'
                            }
                        },
                        {
                            admin_village: {
                                [Op.like]: '%' + param + '%'
                            }
                        },{
                            nature_village: {
                                [Op.like]: '%' + param + '%'
                            }
                        }
                    ]
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
                        msg: '水库列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });

};