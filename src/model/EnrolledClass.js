import mongoose from "mongoose";

const enrolledClassSchema = new mongoose.Schema({
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'papers'
    },
    class: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classes'
        }],
        required: true
    },
    finalGrade: {
        type: Number
    },
    frequency: {
        type: Number
    }
})

const model = mongoose.model('enrolledClass', enrolledClassSchema);

export default model;