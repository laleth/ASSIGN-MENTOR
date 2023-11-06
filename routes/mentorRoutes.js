const express = require("express")
const MentorModel = require("../models/mentorModel")
const StudentModel = require("../models/studentModel")

const router = express.Router()

router.post("/add-mentor", async (req, res) => {
    try {
        const newmentor = new MentorModel(req.body)
        await newmentor.save()
        res.send("New Mentor Added Successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/get-mentors", async (req, res) => {
    try {
        const mentor = await MentorModel.find()
        res.send(mentor)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/add-students-to-mentor", async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;

        const mentor = await MentorModel.findById(mentorId).populate('students');

        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        const students = await StudentModel.find({ _id: { $in: studentIds } });
       
        if (students.length === 0) {
            return res.status(404).json({ message: "No students found with the provided IDs" });
        }

        
        mentor.students.push(...students);

       

        await mentor.save();

        res.send("Students added to the mentor successfully");
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/mentor-students/:mentorId", async (req, res) => {
    try {
        const mentorId = req.params.mentorId;

        const mentor = await MentorModel.findById(mentorId).populate('students');

        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        res.json(mentor.students);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/assign-mentor-to-student", async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;

        const student = await StudentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const mentor = await MentorModel.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        
        student.previousMentor = student.mentor;
        student.mentor = mentorId;

        await student.save();

        res.send("Mentor assigned to the student successfully");
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get("/student-previous-mentor/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;

        const student = await StudentModel.findById(studentId).populate("previousMentor");

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.previousMentor) {
            return res.status(404).json({ message: "No previously assigned mentor found for the student" });
        }

        res.json(student.previousMentor);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router