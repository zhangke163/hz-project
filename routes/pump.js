const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Pump = app.db.models.Pump;

    app.route('/pumps')
        .get((req, res) => {
            let page = req.query.page||1,
                limit = req.query.limit,
                name = req.query.name || '',
                district = req.query.district || '',
                district_code = req.query.district_code || '',
                offset = limit * (page - 1);

                offset=offset<0?0:offset;

                let option= {
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
                    option.offset = offset
                }
                Pump.findAndCountAll(option)
                .then(result => res.json({
                    code: 0,
                    msg: '泵站列表',
                    count: result.count,
                    data: result.rows
                }))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

        app.route('/pumps/findByMultiField')
        .get((req, res) => {
            let page = req.query.page||1,
                limit = req.query.limit||0,
                param = req.query.name || '';

            let offset = limit * (page - 1);

            let option= {
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
                }
            }
            if(limit>0){
                option.limit = limit;
                option.offset = offset
            }

            Pump.findAndCountAll(option)
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '泵站列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });
};