const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const multiparty = require('multiparty');
const path = require('path');

module.exports = app => {
    const Questions = app.db.models.Questions;
    const Files = app.db.models.Files;
    app.route('/question/:id')
        //.all(app.auth.authenticate())
        .get((req, res) => {
            Questions.findOne({
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
        })
        .put((req, res) => {
            Questions.update(req.body, {
              where: { id: req.params.id }
            })
              .then(result => {
                res.sendStatus(204);
              })
              .catch(error => {
                res.status(412).json({ code: 412, msg: error.message });
              });
          })
        .post((req, res) => {
            const form = new multiparty.Form();
            const uploadUrl = app.libs.config.uploadUrl;
            const uploadPath = app.libs.config.uploadPath;
            form.uploadDir = path.resolve(uploadPath); 
                form.parse(req, function (err, fields, files) {
                    var obj ={};
                    
                    if(!fields){
                        fields = {};
                    }
                    Object.keys(fields).forEach(function(name) {
                        obj[name] = fields[name][0];
                    });
                    Questions.update(obj, {
                        where: { id: req.params.id }
                    }).then(result =>{
                        if(files.upload){
                            let question_id = req.params.id
                            const count = files.upload.length;
                            var tempCount=0;
                            files.upload.forEach(function (item) {
                                let upload_time = req.body.upload_time,
                                filepath = item.path;
                                tempArr = filepath.split('\\');
                                filename = tempArr[tempArr.length-1];
                                console.log(filename);
                                filepath = uploadUrl+filename;
                                Files.create({ upload_time:upload_time, path:filepath, question_id:question_id }).then(fileRes => {
                                    tempCount++;
                                    if(tempCount==count){
                                        res.json({
                                            code: 0,
                                            msg: '更新成功'
                                        });
                                    }
                                }).catch(error => {
                                    res.status(412).json({ code: 412, msg: error.message });
                                });
                            });
                        }else{
                            res.json({
                                code: 0,
                                msg: '更新成功'
                            });
                        }
                    }).catch(error => {
                        res.status(412).json({ code: 412, msg: error.message });
                    });
                }); 

        })
        .delete((req, res) => {
            Questions.destroy({ where: { id: req.params.id } })
                .then(result => {
                    Files.destroy({ where: { question_id: req.params.id } }).then(question=>{
                        res.json({
                            code: 0,
                            msg: '删除成功',
                            data:question
                        });
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        });

    app.route('/questions')
        .get((req, res) => {
            let page = parseInt(req.query.page) || 1,
                limit = parseInt(req.query.limit) || 10,
                content = req.query.content || '';
            patrol_id = req.query.patrol_id;
            sqlWhere = {
                content: {
                    [Op.like]: `%${content}%`
                }
            }
            if (patrol_id) {
                sqlWhere.patrol_id = patrol_id;
            }

            //避免传入负数
            page = page > 0 ? page : 1;
            limit = limit > 0 ? limit : 10;

            let offset = limit * (page - 1);

            Questions.findAndCountAll({
                where: sqlWhere,
                limit: limit,
                offset: offset
            })
                .then(result => {
                    res.json({
                        code: 0,
                        msg: '问题列表',
                        count: result.count,
                        data: result.rows
                    })
                })
                .catch(error => {
                    res.status(412).json({ code: 412, msg: error.message });
                });
        })

        .post((req, res) => {
            const form = new multiparty.Form();
            const uploadUrl = app.libs.config.uploadUrl;
            const uploadPath = app.libs.config.uploadPath;
            form.uploadDir = path.resolve(uploadPath); 
                form.parse(req, function (err, fields, files) {
                    var obj ={};
                    if(!fields){
                        fields = {};
                    }
                    Object.keys(fields).forEach(function(name) {
                        obj[name] = fields[name][0];
                    });
                    console.log(obj);

                    Questions.create(obj).then(result =>{
                        if(files.upload){
                            let question_id = result.id
                            const count = files.upload.length;
                            var tempCount=0;
                            files.upload.forEach(function (item) {
    
                                let upload_time = req.body.upload_time,
                                filepath = item.path;
                                tempArr = filepath.split('\\');
                                filename = tempArr[tempArr.length-1];
                                console.log(filename);
                                filepath = uploadUrl+filename;
    
                                Files.create({ upload_time:upload_time, path:filepath, question_id:question_id }).then(fileRes => {
                                    tempCount++;
                                    if(tempCount==count){
                                        res.json({
                                            code: 0,
                                            msg: '提交成功'
                                        });
                                    }
                                }).catch(error => {
                                    res.status(412).json({ code: 412, msg: error.message });
                                });
                            });
                        }else{
                            res.json({
                                code: 0,
                                msg: '提交成功'
                            });
                        }
                        
                    }).catch(error => {
                        res.status(412).json({ code: 412, msg: error.message });
                    });
                    

                });  


        });

};
