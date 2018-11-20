const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = app => {
    const Lock = app.db.models.Lock;

    app.route('/locks')
        .get((req, res) => {
            let page = req.query.page||1,
                limit = req.query.limit,
                name = req.query.name || '',
                district = req.query.district || '',
                offset = limit * (page - 1);
                offset=offset<0?0:offset;
                let option= {
                    where: {
                        name: {
                            [Op.like]: '%' + name + '%'
                        },
                        district: {
                            [Op.like]: '%' + district + '%'
                        }
                    }
                }
                if(limit>0){
                    option.limit = limit;
                    option.offset = offset
                }


                Lock.findAndCountAll(option)
                .then(result => res.json({
                    code: 0,
                    msg: '水闸列表',
                    count: result.count,
                    data: result.rows
                }))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

        app.route('/locks/findByMultiField')
        .get((req, res) => {
            let page = req.query.page||1,
                limit = req.query.limit,
                param = req.query.name || '';

            //避免传入负数
            page = page > 0 ? page : 1;
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
            

            Lock.findAndCountAll(option)
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '水闸列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });
};