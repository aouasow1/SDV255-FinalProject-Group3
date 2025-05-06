const express = require('express')

const Course = require('./models/course')

var cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require('./models/user')


const app = express()

app.use(cors())
app.use(express.json())

const router = express.Router()
const secret = 'supersecret'

//create new user
router.post('/user', async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: 'Missing Password or Username'})
    }
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status

    })
    try {
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201)
    }
    catch(err) {
        res.status(400).send(err)
            
    }
})

//Authentificate
router.post('/auth', async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
        return
    }
    //try to find the username in the database
    //await finding a user
    let user = await User.findOne({username: req.body.username})
        //connection or server error
    if(!user) {
            res.status(401).json({error: "Bad Username"})
        }
        //check to see if user password match the request password
    else {
        if(user.password != req.body.password) {
            res.status(401).json({error: 'Bad Password'})
            }
            //successful login
        else {
                //create a token that is encoded with the jwt
            username2 = user.username

            const token = jwt.encode({username: user.username}, secret)
            const auth = 1

            //respond with token
            res.json({
                username2,
                token: token,
                auth: auth
            })
            }
        }
})
//check status with valid token, see if it match with front end
router.get('/status', async(req,res) => {
    if(!req.headers['x-auth']) {
        return res.status(401).json({error: 'Missing x-auth'})
    }
    //if x-auth contains the token(it should)
    const token = req.headers['x-auth']
    try {
        const decoded = jwt.decode(token, secret)
        //send back all username and status to the user or in frontend
        let users = User.find({}, 'username status')
        res.json(users)
    }
    catch(ex) {
        res.status().json({error: 'Invalid JWT'})
    }
})


//grab all course in a database
router.get('/courses', async(req, res) => {
    try{
        const courses = await Course.find({})
        res.send(courses)
        console.log(courses)
    }

    catch(err){
        console.log(err)
    }
})

router.get('/courses/:id', async(req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        res.json(course)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

router.post('/courses', async(req, res) => {
    try{
        const course = await new Course(req.body)
        await course.save()
        res.status(201).json(course)
        console.log(course)
    }
    catch(err){
        res.status(400).send(err)

    }
})

//update is to update an existing record/ressources databases entry...it use a put request
router.put('/courses/:id', async(req, res) => {
    try {
        const course = req.body
        await Course.updateOne({_id: req.params.id},course)
        console.log(course)
        res.sendStatus(204)
    }
    
    catch(err) {
        res.status(400).send(err)
    }
})
router.delete('/courses/:id', async(req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        console.log(course)
        await Course.deleteOne({_id: course._id})
        res.sendStatus(204)

    }
    catch(err) {
        res.status(400).send(err)
    }
})




app.use('/api', router);
app.listen(3001)





