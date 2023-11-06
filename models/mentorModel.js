const mongoose = require("mongoose")

const mentorSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true },
        phone: {type:Number, required:true},
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }]
    },
    { timestamps: true }
)

const mentorModel = mongoose.model("mentor", mentorSchema)

module.exports = mentorModel