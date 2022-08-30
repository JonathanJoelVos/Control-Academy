import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workLoad: {
        type: Number,
        required: true
    },
    menu: {
        type: String,
        required: true
    },
    classes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "classes"
        }]
    }
}, {
    versionKey: false
})

const model = mongoose.model('disciplines', disciplineSchema);

export default model;