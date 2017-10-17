// Week 1 Group Lab
// Interns class object
define('Interns', ['dojo/dom', 'dojo/dom-construct', 'dojo/query', 'dojo/_base/declare'], (dom, domConstruct, query, declare) => {
	return declare(null, {
  	constructor: () => {
      this.interns = []
      this.grades = []
    },

    addIntern: (id, name, programs) => {
      return new Promise((resolve, reject) => {
      	let icon = document.getElementsByTagName('i')
        let _id = this.interns.find(item => {
          return item.id === id
        })
        
        // Intern Template block
        let row = domConstruct.toDom(`
          <tbody>
            <tr id="intern-${id}" class="fade-in">
              <td class="col-xs-1">
                <h3 class="halftopmargin halfbottommargin">${id}</h3>
              </td>
              <td class="col-xs-6">
                  <div id="openInfo-${id}" class="panel panel-default halftopmargin hide">
                      <div class="panel-heading">
                          <a class="info-open" data-info="${id}" href="#">
                              <span class="glyphicon glyphicon-chevron-up"></span> ${name}
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
                                <span class="glyphicon glyphicon-chevron-down"></span> ${name}
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
        </tbody> 
      `)
        
        // Push new intern
        if (_id !== id) {
          this.interns.push({
            id: id,
            name: name,
            programsCompleted: new Set()
          })
      		// Create an intern table row
      		domConstruct.place(row, 'interns')
          resolve(console.log('success'))
        } else {
          reject(console.log('ID has already been taken by another intern'))
        }
      })
    },

    returnAllInterns: () => {
    	return this.interns
    },

    findInternIndexById: (id) => {
      return this.interns.find(item => {
        return item.id === id
      })
    },

    findInternIndexByName: (name) => {
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
    },

    removeIntern: (id) => {
      let findIntern = this.interns.find(item => {
         return item.name === id || item.id === id
      })
      let index = this.interns.indexOf(findIntern)
      this.interns.splice(index, 1)
      domConstruct.destroy('intern-' + id)
    },

    sortInternsByName: (name) => {
      return this.interns.sort((a, name) => {
        return a.name.localeCompare(name)
      })
    },

    addProgramToIntern: (internId, program, grade, gradeId) => {
      return new Promise((resolve, reject) => {
        let counter = document.getElementById('counter-' + internId)
        let programCount = 0
        let id = this.interns.find(item => {
          return item.id === internId
        })
        // Add program to set
        id.programsCompleted.add(program)
        // Update Programs counter
        id.programsCompleted.forEach((prog) => {
          programCount++
        })

        // Push grade info to global grade array
        this.grades.push({
          internId: internId,
          id: gradeId,
          program: program,
          grade: grade
        })

        let row = domConstruct.toDom(
          `<tr class="fade-in">
              <td>${program}<td>
              <td id="grade-${gradeId}">${grade}%</td>
              <td><i data-grade="${gradeId}" class="gradeEdit glyphicon glyphicon-pencil"></i></td>
            </tr>`)
        domConstruct.place(row, 'programInfo-' + internId)
        counter.innerHTML = programCount
        resolve(console.log('Program Add completed'))
      })
    },

    removeProgramFromIntern: (internId, programName, grade) => {
      let id = this.interns.find(item => {
        return item.id === internId
      })
      id.programsCompleted.delete(programName)
    },

    openInternInfo: (internId) => {
      let _id = this.interns.find(item => {
        return item.id === internId
      })
      let _openInfo = document.getElementById('openInfo-' + internId)
      let _closeInfo = document.getElementById('closeInfo-' + internId)
      _closeInfo.classList.remove('hide')
      _openInfo.classList.add('hide')
    },

    closeInternInfo: (internId) => {
      let _id = this.interns.find(item => {
        return item.id === internId
      })
      let _openInfo = document.getElementById('openInfo-' + internId)
      let _closeInfo = document.getElementById('closeInfo-' + internId)
       _openInfo.classList.remove('hide')
      _closeInfo.classList.add('hide')
    },
    getEditInfo: (gradeId) => {
      let programEditName = document.getElementById('programEditName')
      let dialogEdit = document.getElementById('dialogEdit')
      let _getGrade = this.grades.find(item => {
        return item.id === gradeId
      })
      programEditName.innerHTML = `<h1>${_getGrade.program}</h1>`
      dialogEdit.classList.replace('hide', 'fixed')
    },
    editInternGrade: (gradeId, gradeVal) => {
      let _grade = document.getElementById('grade-' + gradeId)
      console.log(this.grades)
      let _getGrade = this.grades.find(item => {
        return item.id === gradeId
      })
      _getGrade.grade = gradeVal
      _grade.innerHTML = _getGrade.grade + "%"
    }
  })
})

// Utilities
define('utilities', ['dojo/_base/declare'], (declare) => {
	return declare(null, {

  	randomNumber: () => {
  		return Math.floor((Math.random() * 100) + 1)
    },
    
    checkInputError: (elementId, value) => {
    	return new Promise((resolve, reject) => {
      	let space = /\s/
        let number = /\d/
      	let element = document.getElementById(elementId)
        let name = this.interns.find(item => {
            item.name === value
          })
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
  })
})

// Add Interns
require(['dojo/dom', 'dojo/on', 'Interns', 'utilities'], (dom, on, interns, utilities) => {
  // Set our interns class instance  
  var internsApp = new interns()
  var util = new utilities()
 	var button = document.getElementById('addBtn')
  var userForm = document.getElementById('userForm')
  var nameInput = document.getElementById('name')
  var internTable = document.getElementById('interns')
  var infoOpen = document.getElementsByClassName('info-open')
  var infoClose = document.getElementsByClassName('info-close')
  var deleteBtn = document.getElementsByClassName('internRemove')
  var dialog = document.getElementById('dialog')
  var dialogForm = document.getElementById('dialogForm')
  var dialogEdit = document.getElementById('dialogEdit')
  var dialogEditForm = document.getElementById('dialogEditForm')
  var addProgramBtn = document.getElementsByClassName('internPrograms')
  var programSelect = document.getElementById('programSelect')
  var grade = document.getElementById('grade')
  var gradeEdit = document.getElementsByClassName('gradeEdit')
  var gradeEditInput = document.getElementById('gradeEditInput')

  // Add two Interns
  internsApp.addIntern(util.randomNumber(), 'Jamison', null)
  internsApp.addIntern(util.randomNumber(), 'Marcus', null)
  
  // User Promises
	userForm.addEventListener('submit', (e) => {
  	e.preventDefault()
    util.checkInputError('error', nameInput.value)
    .then(() => {
    	internsApp.addIntern(util.randomNumber(), nameInput.value, null )
    })
    // reset name form
    .then(() => {
    	nameInput.form.reset()
    })
    // Listener for button to add new program
    .then(() => {
      for (let i = 0; i < addProgramBtn.length; i++) {
      	addProgramBtn[i].addEventListener('click', (e) => {
          e.preventDefault()
          // Convert custom atribute to number for id evaluation
          var id = parseInt(e.target.dataset.programs)
          dialog.classList.replace('hide', 'fixed')
          
          // add new program to intern by id
          dialogForm.addEventListener('submit', (e) => {
            e.preventDefault()
            internsApp.addProgramToIntern(id, programSelect.value, grade.value, util.randomNumber())
            programSelect.form.reset()
            grade.form.reset()
            dialog.classList.replace('fixed', 'hide')

            // Listeners for Editing Grades 
            for (let i = 0; i < gradeEdit.length; i++) {
              gradeEdit[i].addEventListener('click', (e) => {
                e.preventDefault()
                let id = parseInt(e.target.dataset.grade)
                internsApp.getEditInfo(id)
                
                dialogEditForm.addEventListener('submit', (e) => {
                  e.preventDefault()
                  internsApp.editInternGrade(id, gradeEditInput.value)
                  gradeEditInput.form.reset()
                  dialogEdit.classList.replace('fixed', 'hide')
                }, {useCapture: true, once: true})
              },)
            }
          }, {useCapture: true, once: true})
        }, {useCapture: true})
      }
    })

    // Listener to close intern information
    .then(() => {
      for (let i = 0; i < infoClose.length; i++) {
        infoClose[i].addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          let $id = parseInt(e.target.dataset.info)
          internsApp.closeInternInfo($id)
        })
      }
    })
    // Listener to open intern information
    .then(() => {
      for (let i = 0; i < infoOpen.length; i++) {
        infoOpen[i].addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          let $id = parseInt(e.target.dataset.info)
          internsApp.openInternInfo($id)
        })
      }
    })
    // Listener for deleting interns
    .then(() => {
    	for (let i = 0; i < deleteBtn.length; i++) {
      	deleteBtn[i].addEventListener('click', (e) => {
          e.preventDefault()
          internsApp.removeIntern(e.target.dataset.intern)
        })
      }
    })
    .catch((error) => {
    	console.log(error)
    })
  })
  
  // Listener check for live input errors on name field
  nameInput.addEventListener('input', (e) => {
  	e.preventDefault()
    util.checkInputError('error', e.target.value)
  })
})
