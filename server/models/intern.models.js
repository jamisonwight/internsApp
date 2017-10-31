var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Interns Schema
var internSchema = new Schema({
  id: {
    type: Number
  },
  isAdmin: Boolean,
  first_name: {
    type: String,
    min: [1, 'Sorry, your last name must have at least 1 character'],
    max: [50, 'Sorry, your last name can only have a maximum of 50 characters'],
    //required: true
  },
  last_name: {
    type: String,
    min: [1, 'Sorry, your last name must have at least 1 character'],
    max: [50, 'Sorry, your last name can only have a maximum of 50 characters'],
    required: false
  },
  programs: [
    {
      internId: {
        type: Number,
      },
      programId: {
        type: Number
      },
      program: {
        type: String,
      },
      counter: {
        type: Number
      },
      grade: {
        type: String,
        required: false
      }
    }
  ]
})

internSchema
.virtual('fullname')
.get(function (){
    return this.first_name + ' ' + last_name
})

internSchema
.virtual('url')
.get(function (){
    return '/intern/' + this.first_name
})


module.exports = mongoose.model('Intern', internSchema) 