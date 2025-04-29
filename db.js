const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://asow7:db1234@course.yolcxnp.mongodb.net/?retryWrites=true&w=majority&appName=Course', {useNewURLParser: true})
module.exports = mongoose