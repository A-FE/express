var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = 'public/data/';

 // 读取数据模块 ——客户端调用
// data/read?type=it
router.get('/read', function(req, res, next) {
    var type = req.params.type || "";
    fs.readFile(PATH + type + '.json', function (err, data){
       if(err){
           return res.send({
               status:0,
               info:'读取文件异常'
           });
       }
       var COUNT = 50;
        // TODO: try{}catch(){}
        var obj =[];
        try{
            obj = JSON.parse(data.toString());
        }catch(e){
            obj = [];
        }
        if(obj.length > COUNT){
            obj = obj.slice(0,COUNT);
        }
        return res.send({
            status:1,
            data:obj
        })
    });
});

// 数据存储模块——后台开发使用
router.post('/write',function(req, res, next){
    // 文件名
    var type = req.params.type || "";
    // 关键字段
    var url = req.params.url || '';
    var title = req.params.title || '';
    var img = req.params.img || '';
    if(!type || !url || !title || !img){
        return res.send({
            status:0,
            info:'提交信息不完整'
        })
    }
    // 1)需要拿到文件的信息
    var filepath = PATH + type + '.json';
    fs.readFile(filepath,function(err, data){
        if(err){
            return res.send({
                status:0,
                info:'读取文件失败'
            })
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            title: title,
            img: img,
            url: url,
            id: guidGenerate(),
            time: new Date()
        };
        arr.splice(0,0,obj);
        // 2)写入文件
        var newData = JSON.stringify(arr);
        fs.writeFile(filepath, newData, function(err, data){
            if(err){
                return res.send({
                    status:0,
                    info:'写入文件失败'
                })
            }
            return res.send({
                status:1,
                data:newData
            })
        })
    });



});

// 阅读模块写入接口 ——后台开发使用
router.post('/write_config', function(req, res, next){
    //TODO:后期进行提交数据的验证
    // 防xss攻击
    // cnpm install
    // var xss = require('xss')
    // var str = xss(name)
    var data = req.body.data;
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    // 写入
    fs.writeFile(PATH + 'config.json',newData, function(err){
        if(err){
            return res.send({
                status:0,
                info:'读取文件失败'
            })
        }
        return res.send({
            status:1,
            info:'数据写入成功',
            data:obj
        })
    })
});

// 登录接口
router.post('/login',function(req, res, next){
    // 用户名、密码
    var username = req.body.username;
    var password = req.body.password;
    //TODO:对用户名、密码进行校验
    // 密码加密 md5(password + '随机字符串')
    if(username === 'admin' && password === '123456'){
        res.cookie('user',username);
        return res.send({
            status:1,
            info:'登录成功'
        });
    }
    return res.send({
        status:0,
        info:'登录失败'
    })
});

function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

module.exports = router;
