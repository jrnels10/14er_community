const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peakSchema = new Schema({
    peakName: {
        type: String
    },
    dateCompleted: {
        type: Date
    },
    datePlanned: {
        type: Date
    },
    dateAttempted: {
        type: Date
    },
    difficulty: {
        type: Number
    },
    routeTaken: {
        type: String
    },
    duration: {
        type: String
    },
})