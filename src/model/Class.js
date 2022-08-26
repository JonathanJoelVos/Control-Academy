import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    enrolled: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }],
        required: true
    },
    discipline: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "disciplines"
    }

})

const model = mongoose.model('classes', classSchema);

export default model;