module.exports = function(io, userCount) {
  const internDb     = require('./models/intern.models')
  const User     = require('./models/user.model')

  var userCount = 0 
  var allUsers = []
  var allInterns = []

  // for each user create an intern table
  User.find({}, function(err, user) {
    if(err) {
      console.log(err)
    }
    allUsers = user
  })
  // Get all intern stores
  internDb.find({}, function(err, docs) {
    allInterns = docs
  })
  

  //====== Socket IO ======
  io.on('connection', function(socket) {
    console.log('Intern has connected')
    userCount++
    console.log(userCount + ' Interns remain online')
  

    // Send all interns in db for frontend on connect
    socket.emit('setInterns', {
      allInterns: allInterns
    })

    io.emit('onConnect', {
      userCount: userCount
    })

    // New Intern  
    socket.on('newIntern', function(data) {
      let intern = new internDb({
        id: data.id,
        first_name: data.first_name,
      })    
      intern.save(function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log('Intern addition was successful')
          allInterns.push(intern)
        }
      })
      io.emit('internAdded', {
        intern: intern
      })
    })

    // Add Program
    socket.on('addProgram', function(data) {
      let counter
      internDb.find({id: data.internId}, function(err, intern){
        if (err) {
          console.log(err)
        }
        intern.forEach(function(i) {
          i.programs.push(data)
          counter = i.programs.length
          i.save(function(err) {
            if (err) {
              console.log(err)
            }
          })
        })
        io.emit('setProgram', {
          programs: data, 
          counter: counter
        })
      })
    })

    // Grade editing
    socket.on('gradeEdit', function(data) {
      internDb.find({id: data.internId}, function(err, intern) {
        if (err) {
          console.log(err)
        }
        intern.forEach(function(i) {
          let _grade
          i.programs.forEach(function(prog) {
          if(prog.programId === data.gradeId) {
            prog.grade = data.grade
          }
          })
          i.save(function(err) {
            if (err) {
              console.log(err)
            }
          })
        })
        io.emit('gradeEdited', {
          gradeEdit: data
        })
      })
    })

    // Remove program
    socket.on('programRemove', function(data) {
      internDb.find({id: data.internId}, function(err, intern) {
        if (err) {
          console.log(err)
        }
        intern.forEach(function(i) {
          i.programs.forEach(function(prog) {
            prog.remove()
            console.log(prog)
          })
          i.save(function(err) {
            if (err) {
              console.log(err)
            }
          })
        })
        io.emit('programRemoved', {
          program: data
        })      
      })
    })

    // Remove intern
    socket.on('internRemove', function(data) {
      internDb.find({id: data.internId}, function(err, intern) {
        if (err) {
          console.log(err)
        }   
      }).remove().exec(function(err){
        if (err) {
          console.log(err)
        }
        io.emit('internRemoved', {
          intern: data
        })  
      })    
    })

    // send grade info for edit dialog on the frontend
    socket.on('gradeInfo', function(data) {
      internDb.find({id: data.internId}, function(err, intern) {
        if (err) {
          console.log(err)
        }
        let internInfo = {
          name: '',
          grade: '',
          title: ''
        }
        intern.forEach(function(i) {
          internInfo.name = i.first_name
          i.programs.forEach(function(prog) {
            if (prog.programId === data.gradeId) {
              internInfo.grade = prog.grade
              internInfo.title = prog.program
            }
          })
        })
        io.emit('setGradeInfo', {
          gradeInfo: data,
          internInfo: internInfo
        })
      })
    })
    
    socket.on('disconnect', function() {
      userCount--
      io.emit('onDisconnect', {
        userCount: userCount
      })
    })
  })

}