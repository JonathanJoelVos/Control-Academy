import mongoose from "mongoose";

const actionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    methods: {
        type: [{
            type: String
        }],
        required: true
    }
})

const model = mongoose.model('actions', actionSchema);

export default model;