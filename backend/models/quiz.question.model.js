import mongoose from "mongoose";

const quizQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: String,
        required: true
    }
})

const Questions = mongoose.model('QuizQuestions', quizQuestionSchema)
export default Questions;

// export default class QuizQuestion {
//     constructor(question, answers) {
//         this.question = question;
//         this.answers = answers
//     }
// }