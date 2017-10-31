// Imports
import Interns from './components/interns.component'
import Utilities from './components/utilities.component'
import Socket from './sockets/interns.sockets'

const socket = io.connect('http://localhost:3000')
const status = document.getElementById('status')
const connected = document.getElementById('connected')
const disconnected = document.getElementById('disconnected')
const button = document.getElementById('addBtn')
const userForm = document.getElementById('userForm')
const nameInput = document.getElementById('name')
const internTable = document.getElementById('interns')
const infoOpen = document.getElementsByClassName('info-open')
const infoClose = document.getElementsByClassName('info-close')
const deleteBtn = document.getElementsByClassName('internRemove')
const dialog = document.getElementById('dialog')
const dialogForm = document.getElementById('dialogForm')
const dialogEdit = document.getElementById('dialogEdit')
const dialogEditForm = document.getElementById('dialogEditForm')
const addProgramBtn = document.getElementsByClassName('internPrograms')
const programSelect = document.getElementById('programSelect')
const grade = document.getElementById('grade')
const gradeEdit = document.getElementsByClassName('gradeEdit')
const gradeEditInput = document.getElementById('gradeEditInput')
const programRemove = document.getElementsByClassName('programRemove')

// Component classes
var internsApp = new Interns()
var util = new Utilities()
var internSocket = new Socket()

// Socket Event modules
internSocket.connect(status, connected)
internSocket.disconnect(status, disconnected)
internSocket.setInterns(internsApp, setupInternListeners)
internSocket.internAdded(internsApp, setupInternListeners)
internSocket.setProgram(internsApp, programSelect, setupInternListeners)
internSocket.gradeEdited(internsApp, gradeEditInput, dialogEdit, setupInternListeners)
internSocket.programRemoved(internsApp)
internSocket.internRemoved(internsApp, setupInternListeners)
internSocket.setGradeInfo(internsApp, setupInternListeners)

// New User Form
// userForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   util.checkInputError('error', nameInput.value)
//   .then(() => {
//     socket.emit('newIntern', {
//       id: util.randomNumber(),
//       first_name: nameInput.value
//     })
//     nameInput.form.reset
//   })
// })

// Add all events to a new intern block
function setupInternListeners() {
  // Add listener to open new program dialog
  for (let i = 0; i < addProgramBtn.length; i++) {
    addProgramBtn[i].addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      // Convert custom atribute to number for id evaluation
      var id = parseInt(e.target.dataset.programs)
      dialog.classList.replace('hide', 'fixed')

      // add new program to intern by id
      dialogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        socket.emit('addProgram', {
          internId: id,
          programId: util.randomNumber(),
          program: programSelect.value,
          grade: grade.value
        })
        grade.form.reset()
        dialog.classList.replace('fixed', 'hide')
      }, {once: true})
    })
  }

  // Listeners for Editing Grades 
  for (let i = 0; i < gradeEdit.length; i++) {
    gradeEdit[i].addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      let internId = parseInt(e.target.dataset.intern),
          gradeId = parseInt(e.target.dataset.grade) 
      // Show Edit dialog 
      dialogEdit.classList.replace('hide', 'fixed')
      socket.emit('gradeInfo', {
        internId: internId,
        gradeId: gradeId,
      })

      dialogEditForm.addEventListener('submit', (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        
        socket.emit('gradeEdit', {
          internId: internId,
          gradeId: gradeId,
          grade: gradeEditInput.value
        })
        internsApp.editInternGrade(gradeId, gradeEditInput.value)
      }, {once: true})
    }, {once: true})
  }

  // Listeners for removing Grades 
  for (let i = 0; i < programRemove.length; i++) {
    programRemove[i].addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      let internId = e.target.dataset.intern,
          programId = e.target.dataset.program
    
      socket.emit('programRemove', {
        internId: internId,
        programId: programId
      })
    })
  }

  // Delete intern listener
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (e) => {
      e.preventDefault()
      let internId = e.target.dataset.intern

      socket.emit('internRemove', {
        internId: internId
      })
    })
  }

  // close program info
  for (let i = 0; i < infoClose.length; i++) {
    infoClose[i].addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let $id = parseInt(e.target.dataset.info)
      internsApp.closeInternInfo($id)
    })
  }

  // open program info
  for (let i = 0; i < infoOpen.length; i++) {
    infoOpen[i].addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let $id = parseInt(e.target.dataset.info)
      internsApp.openInternInfo($id)
    })
  }
} 

// Listener check for live input errors on name field
nameInput.addEventListener('input', (e) => {
  e.preventDefault()
  util.checkInputError('error', e.target.value)
})
