const express = require('express')
const router = express.Router()
const cors = require('cors')


//Give write access to server
const whitelist = ["http://localhost:3000", "https://covid19-reporting-web-app.herokuapp.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
router.use(cors(corsOptions))



// get exam schema from ../models/exam
const Exam = require('../models/exam')

// Getting all exams
router.get('/', async (req, res) => {
    try {
        // get all exams, and retrieve it in json format.
        const exams = await Exam.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.json(exams)
    }
    catch (err) {
        // if error, display error 500
        res.status(500).json({ message: err.message})
    }
})

// getting one exam
router.get('/:id', getExam, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.json(res.exam)
})


// adding an exam
router.post('/', async (req, res) => {
    const exam = new Exam({
      date: req.body.date,
      xRayImageLink: req.body.xRayImageLink,
      keyFindings: req.body.keyFindings,
      brixiaScores: req.body.brixiaScores,
      patientID: req.body.patientID
    })
    try {
        // add the exam
        const newExam = await exam.save()
        res.header("Access-Control-Allow-Origin", "*")
        console.log(newExam)
        res.status(201).json(newExam)
    } catch (err) {
        // if error, display error 400
        res.status(400).json({ message: err.message })
    }
})


// Updating an exam
router.patch('/:id', getExam, async (req, res) => {

    // if date in the request body is not null, which means we want to update it,
    // then update date, and same with all other attributes.
    if (req.body.date != null) {
      res.exam[0].date = req.body.date
    }
    if (req.body.xRayImageLink != null) {
      res.exam[0].xRayImageLink = req.body.xRayImageLink
    }
    if (req.body.keyFindings != null) {
      res.exam[0].keyFindings = req.body.keyFindings
    }
    if (req.body.brixiaScores != null) {
        res.exam[0].brixiaScores = req.body.brixiaScores
    }
    if (req.body.patientID != null) {
        res.exam[0].patientID = req.body.patientID
    }
    try {
      const updatedExam = await res.exam[0].save()
      res.header("Access-Control-Allow-Origin", "*")
      res.json(updatedExam)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // deleting an exam
  router.delete('/:id', getExam, async (req, res) => {
    try {
      // delete exam with this id.
      await res.exam[0].remove()
      res.header("Access-Control-Allow-Origin", "*")
      res.json({ message: 'Exam deleted' })
    } catch (err) {
      // if error, display error 500
      res.status(500).json({ message: err.message })
    }
  })
  

  // getting a specific exam by id
  async function getExam(req, res, next) {
    let exam = []
    try {
      // get exam by id.
      exam[0] = await Exam.findById(req.params.id)
      // if there is no exam with this id, display cannot find exam.
      if (exam == null) {
        return res.status(404).json({ message: 'Cannot find exam' })
      }
    } catch (err) {
      // if error, display error 500
      return res.status(500).json({ message: err.message })
    }
  
    res.exam = exam
    next()
  }

module.exports = router