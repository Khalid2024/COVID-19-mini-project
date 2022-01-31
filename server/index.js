const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express()

const mongoose = require('mongoose')

// database url.
const url = 'mongodb+srv://nocturnals:AeT3RFlq38I3BXWp@cluster0.fqifx.mongodb.net/examResultsDB?retryWrites=true&w=majority'

// connecting to the database
mongoose.connect(url, { useNewUrlParser: true})

// check if the connection was successful or no
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


// telling the app that we'll use json
app.use(express.json())

<<<<<<< HEAD
// use patient router in http://localhost:3001/patients
const patientsRouter = require('./routes/patients')
app.use('/patients', patientsRouter)
=======
>>>>>>> 573275a0e1c18431c4152727380a27be055b264b


app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// server listening on port 3001
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//test commit 2