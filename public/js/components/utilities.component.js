// Utilities
export default class Utilities {
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