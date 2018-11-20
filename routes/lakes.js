const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Lakes = app.db.models.Lakes;
    app.get('/lake/district/name', (req, res) => {
        let name = req.query.name,
        district_code = req.query.district_code;

        Lakes.findOne({
            where: {
                name: name,
                district_code: district_code
            }
        })
            .then(result => {
                res.json({ code: 0, msg: '', data: result });
            })
            .catch(error => {
                res.json({ code: 412, msg: '' });
            });
    });

    app.route('/lakes')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                name = req.query.name || '',
                district = req.query.district || '',
                district_code = req.query.district_code || '',
                offset = limit * (page - 1);

            Lakes.findAndCountAll({
                    offset: offset,
                    limit: limit,
                    where: {
                        name: {
                            [Op.like]: '%' + name + '%'
                        },
                        district: {
                            [Op.like]: '%' + district + '%'
                        },
                        district_code: {
                            [Op.like]: '%' + district_code + '%'
                        }
                    },
                })
                .then(result => res.json({
                    code: 0,
                    msg: '湖漾列表',
                    count: result.count,
                    data: result.rows
                }))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Lakes.create(req.body)
                .then(result => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

        app.route('/lakes/findByMultiField')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                param = req.query.name || '';

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Lakes.findAndCountAll({
                where: {
                    [Op.or]:[
                        {
                            district: {
                                [Op.like]: '%' + param + '%'
                            }
                        },
                        {
                            name: {
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