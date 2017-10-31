module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index')
  })

  app.get('/login', function(req, res) {
    res.render('login', {message: req.flash('loginMessage')})
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/interns',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/register', function(req, res) {
    res.render('register', {message: req.flash('registerMessage')})
  })

  app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/interns',
    failureRedirect: '/register',
    failureFlash: true
  }))

  app.get('/interns', isLoggedIn, function(req, res) {
    res.render('interns', {
      user: req.user
    })
  })

  // register for passport
  //app.post('/register', do stuff here)

  app.get('/user', isLoggedIn, function(req, res) {
    res.sender('intern', {
      user: req.user
    })
  })

  app.get('/logout', function(req,res) {
    req.logout()
    res.redirect('/')
  })

  app.get('/intern/:first_name', function(req, res) {
    console.log(req.params)
    res.render('intern', req.params)
  })

  function isLoggedIn(req, res,next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect('/login')
  }

}