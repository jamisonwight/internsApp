const socket = io.connect('http://localhost:3000')

export default class Socket {
  constructor() {}

  connect(statusSelector, connectedSelector) {
    socket.on('onConnect', (data) => {
      statusSelector.innerHTML = `<h1>Interns Online: ${data.userCount}</h1>`
      connectedSelector.classList.remove('hide')
      setTimeout(() => {
        connectedSelector.classList.add('hide')
      }, 4500)
    })
  }

  disconnect(statusSelector, disconnectedSelector) {
    socket.on('onDisconnect', (data) => {
      statusSelector.innerHTML = `<h1>Interns Online: ${data.userCount}</h2>`
      disconnectedSelector.classList.remove('hide')
      setTimeout(() => {
        disconnectedSelector.classList.add('hide')
      }, 4500)
    })
  }
  setInterns(instanceModule, listenerFunction) {
    socket.on('setInterns', (data) => {
      data.allInterns.map((intern) => {
        instanceModule.addIntern(
          intern.id,
          intern.isAdmin, 
          intern.first_name,
          intern.last_name, 
          intern.programs)
        .then(() => {
          listenerFunction() 
        })
      })
    })
  }
  internAdded(instanceModule, listenerFunction) {
    socket.on('internAdded', (data) => {
      instanceModule.addIntern(
        data.intern.id,
        data.intern.isAdmin, 
        data.intern.first_name,
        data.intern.last_name, 
        data.intern.programs)
        listenerFunction()
    })
  }
  internRemoved(instanceModule, listenerFunction) {
    socket.on('internRemoved', (data) => {
      instanceModule.removeIntern(
        data.intern.internId
      )
    })
  }
  setProgram(instanceModule, inputSelector, listenerFunction) {
    socket.on('setProgram', (data) => {
      instanceModule.addProgramToIntern(
        data.programs.internId,
        data.programs.program,
        data.programs.grade,
        data.programs.programId,
        data.counter)
        listenerFunction()
      inputSelector.form.reset()
    })
  }
  gradeEdited(instanceModule, inputSelector, dialogSelector) {
    socket.on('gradeEdited', (data) => {
      console.log(data)
      instanceModule.editInternGrade(
        data.gradeEdit.gradeId, 
        data.gradeEdit.grade)
      dialogSelector.classList.replace('fixed', 'hide')
      inputSelector.form.reset()
    })
  }
  programRemoved(instanceModule) {
    socket.on('programRemoved', (data) => {
      instanceModule.removeProgramFromIntern(
        data.program.internId,
        data.program.programId,
      )
    })
  }
  
  setGradeInfo(instanceModule, listenerFunction) {
    socket.on('setGradeInfo', (data) => {
      console.log(data)
      instanceModule.editGradeInfo(
        data.gradeInfo.internId,
        data.gradeInfo.gradeId,
        data.internInfo.grade,
        data.internInfo.name,
        data.internInfo.title
      )
      listenerFunction()
    })
  }
}