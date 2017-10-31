/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_interns_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utilities_component__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sockets_interns_sockets__ = __webpack_require__(4);
// Imports




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
var internsApp = new __WEBPACK_IMPORTED_MODULE_0__components_interns_component__["a" /* default */]()
var util = new __WEBPACK_IMPORTED_MODULE_1__components_utilities_component__["a" /* default */]()
var internSocket = new __WEBPACK_IMPORTED_MODULE_2__sockets_interns_sockets__["a" /* default */]()

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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Week 1 Group Lab
// Interns class object
class Interns {
  constructor(){
    this.interns = []
    this.grades = []
  }

  addIntern(id, isAdmin, firstName, lastName, programs) {
    return new Promise((resolve, reject) => {
      let icon = document.getElementsByTagName('i')
      let _internsSelector = document.getElementById('interns')
      
      console.log(firstName + lastName)
      // Intern Template block
      let row = 
        ` <tr id="intern-${id}" class="fade-in">
          <td class="col-xs-1">
            <p class="halftopmargin halfbottommargin">${id}</p>
          </td>
          <td class="col-xs-6">
              <div id="openInfo-${id}" class="panel panel-default halftopmargin hide">
                  <div class="panel-heading">
                      <a class="info-open" data-info="${id}" href="#">
                          <span class="glyphicon glyphicon-chevron-up"></span> ${firstName} ${lastName}
                      </a>
                  </div>
                  <div class="panel-body">
                    <h3 class="pull-left">Internship Information</h3>
                    <table class="col-xs-12 table table-striped">
                      <thead>
                        <tr>
                          <th>Programs Completed</th>
                          <th>&nbsp;</th>
                          <th>Grades</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody id="programInfo-${id}"></tbody>
                    </table>
                  </div>
                </div>
                <div id="closeInfo-${id}" class="panel panel-default halftopmargin halfbottommargin">
                    <div class="panel-heading">
                        <a class="info-close" data-info="${id}" href="#">
                            <span class="glyphicon glyphicon-chevron-down"></span> ${firstName} ${lastName}
                        </a>
                    </div>
                </div>
              </div>
          </td>
          <td class="col-xs-3" id="program-${id}"> 
            <span id="counter-${id}" class="counter">0</span>
            <i id="programCount-${id}" data-programs="${id}" class="internProgramsCount glyphicon glyphicon-education halftopmargin halfbottommargin"></i> 
            <i data-programs="${id}" class="internPrograms glyphicon glyphicon-plus "></i>
          </td>
          <td class="col-xs-3"><i data-intern="${id}" class="internRemove glyphicon glyphicon-trash halftopmargin halfbottommargin"></i></td>
        </tr>
      </tr>
    </tbody>`
      
      if (!isAdmin) {
        // Create an intern table row
        _internsSelector.insertAdjacentHTML('beforeend', row)
        resolve(console.log('success'))
      } 
    })
    .then(() => {
      let _programSelector = document.getElementById('programInfo-' + id)
      let _counterSelector = document.getElementById('counter-' + id)

      // If there are programs add to program list
      if (programs !== null && isAdmin === false) {
        let counter = 1
        console.log(typeof counter)
        programs.map((prog) => {
          let row = 
            `<tr id="programInfoItem-${prog.programId}" class="fade-in">
              <td>${prog.program}<td>
              <td id="grade-${prog.programId}" class="bold">${prog.grade}%</td>
              <td>
                <i data-intern="${id}" data-grade="${prog.programId}" class="gradeEdit glyphicon glyphicon-pencil"></i>
                <i data-intern="${id}" data-program="${prog.programId}" class="programRemove glyphicon glyphicon-trash"></i>
              </td>
            </tr>`
          _counterSelector.innerHTML = counter++
          _programSelector.insertAdjacentHTML('beforeend', row)
        })
      } else {
        console.log("programs is null")
      }
    })
  }

  returnAllInterns() {
    return this.interns
  }

  findInternIndexById(id) {
    return this.interns.find(item => {
      return item.id === id
    })
  }

  findInternIndexByName(name) {
    return this.interns.find(item => {
      let nameFirstChar = item.name.charAt(0)
      let nameUpperCase = item.name.replace(/(^| )(\w)/g, function(nameFirstChar) {
        return nameFirstChar.toUpperCase()
      })
      // Find name by lowercase or by the first character in name to uppercase
      if (item.name === name) {
        return item.name === name
      } else if (nameUpperCase === name) {
        return nameUpperCase === name
      } else {
        return
      }
    })
  }

  removeIntern(id) {
    let _internSelector = document.getElementById('intern-' + id)
    _internSelector.remove()
  }

  sortInternsByName(name) {
    return this.interns.sort((a, name) => {
      return a.first_name.localeCompare(name)
    })
  }

  addProgramToIntern(internId, program, grade, gradeId, programCounter) {
    return new Promise((resolve, reject) => {
      let programsLength = 0
      let counter = document.getElementById('counter-' + internId)
      let _programSelector = document.getElementById('programInfo-' + internId)
    
      // Program template
      let row = 
        `<tr id="programInfoItem-${gradeId}" class="fade-in">
          <td>${program}<td>
          <td id="grade-${gradeId}" class="bold">${grade}%</td>
          <td>
            <i data-intern="${internId}" data-grade="${gradeId}" class="gradeEdit glyphicon glyphicon-pencil"></i>
            <i data-intern="${internId}" data-program="${gradeId}" class="programRemove glyphicon glyphicon-trash"></i>
          </td>
        </tr>`

      _programSelector.insertAdjacentHTML('beforeend', row)
      counter.innerHTML = programCounter
      resolve(console.log('Program Add completed'))
    })
  }

  removeProgramFromIntern(internId, programId) {
    let _programSelector = document.getElementById('programInfoItem-' + programId),
        counter = document.getElementById('counter-' + internId)

    if (counter.innerHTML !== 1) {
      counter.innerHTML = counter.innerHTML -= 1
    }
    _programSelector.remove()
  }

  editInternGrade(gradeId, gradeVal) {
    let _grade = document.getElementById('grade-' + gradeId)
    _grade.innerHTML = gradeVal + '%'
  }

  editGradeInfo(internId, gradeId, grade, internName, title) {
    let currentGrade = document.getElementById('programCurrentGrade'),
        programTitle = document.getElementById('programTitle'),
        programInternName = document.getElementById('programInternName')

    programInternName.innerHTML = `<h3>Intern: <span>${internName}</span></h3>`
    programTitle.innerHTML = `<h3>Program: <span>${title}</span></h3>`
    currentGrade.innerHTML = `<h3>Current Grade: <span>${grade}%</span></h3>`
  }

  openInternInfo(internId) {
    let _id = this.interns.find(item => {
      return item.id === internId
    })
    let _openInfo = document.getElementById('openInfo-' + internId)
    let _closeInfo = document.getElementById('closeInfo-' + internId)
    _closeInfo.classList.remove('hide')
    _openInfo.classList.add('hide')
  }

  closeInternInfo(internId) {
    let _id = this.interns.find(item => {
      return item.id === internId
    })
    let _openInfo = document.getElementById('openInfo-' + internId)
    let _closeInfo = document.getElementById('closeInfo-' + internId)
     _openInfo.classList.remove('hide')
    _closeInfo.classList.add('hide')
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Interns;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Utilities
class Utilities {
  randomNumber() {
    return Math.floor((Math.random() * 1000) + 1)
  }
  
  checkInputError(elementId, value) {
    return new Promise((resolve, reject) => {
      let space = /\s/
      let number = /\d/
      let element = document.getElementById(elementId)
      if (number.test(value)) {
        element.classList.replace('hide', 'show')
        reject('Name must be letters only', element.innerHTML = '<span><b>Warning:</b> Name must be letters only</span>')
      } else if (name) {
        element.classList.replace('hide', 'show')
        reject('Name has already been taken', element.innerHTML = '<span><b>Warning:</b> Name has already been taken. Use a unique name.</span>')
      } else if (space.test(value)) {
        element.classList.replace('hide', 'show')
        reject('Name must not have spaces', element.innerHTML = '<span><b>Warning:</b> Name must not have spaces</span>')
      } else if (value === '') {
        element.classList.replace('hide', 'show')
        reject('Warning: field is empty', element.innerHTML = '<span><b>Warning:</b> This field is required before submission</span>')
      } else {
        element.classList.replace('show', 'hide')
        resolve('No Errors')
      }
    })
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utilities;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const socket = io.connect('http://localhost:3000')

class Socket {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Socket;


/***/ })
/******/ ]);