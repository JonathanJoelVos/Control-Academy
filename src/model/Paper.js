import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    actions: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actions'
        }],
        required: true
    }
})

const model = mongoose.model('papers', paperSchema);

export default model;