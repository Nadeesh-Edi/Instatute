import mongoose from "mongoose";

const webforumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    uiType: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

const Webforums = mongoose.model('Webforums', webforumSchema);
export default Webforums;