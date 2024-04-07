import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [{
            question: {
                type: String
            },
            answers: {
                type: [String] || [Number]
            },
            correctAnswerIndex: {
                type: Number
            }
        }],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    timePeriod: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
})

const Quizes = mongoose.model('Quizes', quizSchema)
export default Quizes;