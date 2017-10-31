const path         = require('path')
const express      = require('express')
const app          = express()
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-Parser')
const fs           = require('fs')
const server       = require('http').Server(app)
const port         = process.env.PORT || 3000
const io           = require('socket.io')(server)
const mongoose     = require('mongoose')
const passport     = require('passport')
const flash        = require('connect-flash')
const morgan       = require('morgan')
const session      = require('express-session')

const url          = 'mongodb://localhost:27017/internsApp'
const configDb = require('./config/database.js')

app.use(morgan('dev'))
//app.use(cookieParser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/')))

server.listen(port, function () {
  console.log('Intern app listening on port 3000!')
})
app.get('/intern/:first_name', function(req, res) {
  console.log(req.params)
  res.render('intern', req.params)
})
app.post('/', function(req, res) {
  console.log(JSON.stringify(req.body))
})

//====== Passport Requirements ======
app.use(session({ 
  secret: 'internyisthenameoftheapp',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./config/passport')(passport, io)

//====== Routes ======
require('./server/routes.js')(app, passport)

//====== Mongooose ======
mongoose.connect(configDb.url, {useMongoClient: true})
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//====== Sockets ======
require('./server/sockets.js')(io)