const db = require('../db')

const Course = db.model('Course', {
    name: {type: String, required: true},
    description: String,
    subjectArea: String,
    credits: {type: Number},
    username: String

})

module.exports = Course;
