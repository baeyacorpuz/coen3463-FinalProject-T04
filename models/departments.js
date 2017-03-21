var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({

  comp_name: {
      type: String,
      required: [true, 'Please fill the Department Name']
      },
  description: {
      type: String,
      required: [true, 'Please fill the Abbreviation']
      },
  value: {
      type: String,
      required: [true, 'Please fill the Secretary/head']
      },
  contact: String,
  createdate: Date,
  updatedate: String,
  picture:String,
}, { collection: 'module4' });

module.exports = mongoose.model('Department', departmentSchema);