const express = require('express')

const Course = require('./models/course')

var cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

const router = express.Router()

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





