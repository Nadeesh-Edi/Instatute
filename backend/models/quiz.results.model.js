import mongoose from "mongoose";

const quizResultsSchema = mongoose.Schema({
    quizId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

const QuizeResults = mongoose.model('QuizeResults', quizResultsSchema)
export default QuizeResults;