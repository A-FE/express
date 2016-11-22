var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'express' });  // index 是模版的名称，第二个参数是数据对象
    });
    app.get('/reg', function (req, res) {
        res.render('reg', { title: '注册' });
    });
    app.post('/reg', function (req, res) {

    });
    app.get('/login', function (req, res) {
        res.render('login', { title: '登录' });
    });
    app.post('/login', function (req, res) {

    });
    app.post('/post', function (req, res) {
        res.render('post', { title: '发表'});
    });
    app.get('/logout', function (req, res) {

    })
};
