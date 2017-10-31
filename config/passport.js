const User = require('../server/models/user.model')
const internDb     = require('../server/models/intern.models')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport, io) {

  // Local register
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function() {

      User.findOne({'local.email': email}, function(err, user) {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, false, req.flash('registerMessage', 'That email has already been taken'))
        }
        else {
          let newUser = new User()
          let internObj = new internDb()
          let allInterns = []

          newUser.local.id =  Math.floor((Math.random() * 1000) + 1)
          newUser.local.first_name = req.body.firstName
          newUser.local.last_name = req.body.lastName
          newUser.local.isAdmin = false
          newUser.local.email = email
          newUser.local.password = newUser.generateHash(password)

          internObj.id = newUser.local.id
          internObj.isAdmin = newUser.local.isAdmin
          internObj.first_name = req.body.firstName
          internObj.last_name = req.body.lastName


          newUser.save(function(err) {
            if (err) {
              throw err
            }
            internObj.save(function(err) {
              if (err) {
                throw err
              }
              // Get all intern stores
              internDb.find({}, function(err, docs) {
                allInterns = docs
                allInterns.push(internObj)
              })
              return done(null, newUser)
            })
          })

          io.on('connect', (function(socket) {
            console.log('shit')
            io.emit('internAdded', {
              intern: internObj
            })
          }))
        }
      })
    })
  }
  ))

   // Local login
   passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function() {

      User.findOne({'local.email': email}, function(err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user with that email were found.'))
        }
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Invalid password.'))
        }
        console.log(user)
        return done(null, user)

      })
    })
  }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}