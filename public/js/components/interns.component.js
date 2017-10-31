// Week 1 Group Lab
// Interns class object
export default class Interns {
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