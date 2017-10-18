const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var userCount = 0
var users= []

app.use(express.static(path.join(__dirname, 'public')))

server.listen(80, function () {
  console.log('Intern app listening on port 80!')
})

io.on('connection', function(socket) {
  console.log('Intern has connected')
  userCount++
  console.log(userCount + 'interns remain online')
  io.emit('onConnect', {userCount: userCount})

  socket.on('disconnect', function() {
    console.log('Intern has disconnected')
    userCount--
    console.log(userCount + 'interns remain online')
    io.emit('onDisconnect', {userCount: userCount})
  })
})