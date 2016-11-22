var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);                            // 设置端口号
app.set('views', path.join(__dirname, 'views'));  // 放模版引擎文件的目录
app.set('view engine', 'ejs');                    // 模版引擎ejs

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));                                     // 加载日志中间件
app.use(bodyParser.json());                                 // 加载解析json的中间价
app.use(bodyParser.urlencoded({ extended: true }));     // 加载解析urllencoded请求的中间体
app.use(cookieParser());                                   // 加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));  // 设置public为存在静态文件的目录

routes(app);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port'+app.get('port'));
})
/*
app.use('/', index);        // 路由控制器
app.use('/users', users);   // 路由控制器
*/

// 捕获404 错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('sorry，未找到您说的什么喳喳文件');
  err.status = 404;
  next(err);
});

// 错误处理器
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 导出app实例供其他模块调用
module.exports = app;

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
