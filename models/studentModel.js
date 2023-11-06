const mongoose = require("mongoose")

const studentSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        class: { type: String, required: true },
        subject: [],
        BloodGroup: { type: String, required: true },
        previousMentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "mentor"
        }
        
    },
    { timestamps: true }
)

const studentModel = mongoose.model("student", studentSchema)

module.exports = studentModel