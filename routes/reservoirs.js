const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Reservoirs = app.db.models.Reservoirs;


    app.get('/reservoir/district/name', (req, res) => {
        let name = req.query.name,
            district_code = req.query.district_code;

        Reservoirs.findOne({
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


    app.route('/reservoirs')
        .get((req, res) => {
            let page = req.query.page||1,
                limit = req.query.limit,
                name = req.query.name || '',
            district = req.query.district || '',
            district_code = req.query.district_code || '',
            offset = limit * (page - 1)||0;

            let option = {
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
                }
            }
            if(limit>0){
                option.limit = limit;
                option.offset = offset;
            }

            Reservoirs.findAndCountAll(option)
                .then(result => res.json({
                    code: 0,
                    msg: '水库列表',
                    count: result.count,
                    data: result.rows
                }))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });


        app.route('/reservoirs/findByMultiField')
        .get((req, res) => {
            let page = req.query.page || 1,
                limit = req.query.limit ,
                param = req.query.name || '';


            let offset = limit * (page - 1)||0;
            let option = {
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
                }
            }
            if(limit>0){
                option.limit = limit;
                option.offset = offset;
            }
            Reservoirs.findAndCountAll(option)
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