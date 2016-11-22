# 使用node.js + express开发简易后台
> 开发环境node.js + express

## 将项目克隆到本地
    git clone https://github.com/peng1992/express.git
## 安装项目依赖
    cnpm install
## 启动项目
    cnpm start
## 然后在浏览器中打开[http://localhost:3000/]( http://localhost:3000/) 网址就可以看到这个应用了
![](./public/images/normal.png)

## 项目目录
* bin/
    + www   -------------------------项目入口文件
* node_modules/   -------------------项目依赖文件夹，cnpm intall后生成 
* public/   
    + data/  ------------------------json数据   
    + images/   ---------------------图片
    + js/   -------------------------js文件       
    + stylesheets/  -----------------css文件
* routes/   -------------------------路由配置文件夹
    + data.js   
    + index.js  
* views/    -------------------------模板文件
    + edit.ejs    
    + error.ejs
    + index.ejs
    + login.ejs
    + tujian.ejs
* app.js   --------------------------存放的Express项目中最基本的配置信息
* package.json   --------------------项目依赖文件
            


     


    
