var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var AuthMiddleware = require('./middleware/Auth')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TwitterWeblike')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(AuthMiddleware.GetLoginedUser)

// API 路由
var UserRouters = require ('./route/User')
var PersonRouters = require ('./route/Person')
var PostRouters = require ('./route/Post')
var CommentRouters = require ('./route/Comment')
var SearchRouters = require ('./route/Search')
UserRouters.forEach((RouteItem) => {
  app.use('/API/user/', RouteItem)
})
PersonRouters.forEach((RouteItem) => {
  app.use('/API/person/', RouteItem)
})
app.use('/API/post/', PostRouters)
app.use('/API/comment/', CommentRouters)
app.use('/API/search/', SearchRouters)



// 頁面路由
app.get('*', (req, res) => {
  res.send('hello World');
})

app.listen(8081, () => {
  console.log('Server is started')
})
