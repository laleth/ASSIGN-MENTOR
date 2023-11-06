const express = require("express")
const StudentModel = require("../models/studentModel")

const router = express.Router()

router.post("/add-student",async (req,res)=>{
    try{
        const newstudent = new StudentModel(req.body)
        await newstudent.save()
        res.send("New Student Added Successfully")
    }catch(error){
        res.status(400).json(error)
    }
})

router.get("/get-students", async (req, res) => {
    try {
        const student = await StudentModel.find()
        res.send(student)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router