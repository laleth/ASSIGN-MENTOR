const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const studentRoute = require("./routes/studentRoutes")
const mentorRoute = require("./routes/mentorRoutes")
const app = express()
const PORT = 5000

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Welcome to Assign-Mentor")
})

app.use("/students",studentRoute)
app.use("/mentors",mentorRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongoose is connected")
        app.listen(PORT, () => console.log(`Server connected on the PORT ${PORT}`))
    }).catch((error) => {
        console.log(error.message)
    })