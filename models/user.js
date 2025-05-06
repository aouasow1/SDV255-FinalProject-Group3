const db = require('../db');

//create user

const User = db.model('User', {
    username: {type: String, required: true},
    password: {type: String, required: true},
    status: String
})

module.exports = User

