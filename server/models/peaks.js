const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peakSchema = new Schema({
    attribute: {
        FID: Number,
        completed: {
            userCompleted: [
                {
                    userId: String,
                    completedDate: Date
                }
            ],
            completedCount: Number,
            avgCompleted: Number
        },
        planned: {
            userPlanned: [
                {
                    userId: String,
                    plannedDate: Date
                }
            ]
        },
        difficulty: {
            userDifficulty: [
                {
                    userId: String,
                    difficulty: Number,
                    routeTaken: String
                }
            ],
            avgDifficulty: Number
        },
        avgDuration: Number,
        elev_feet: Number,
        elev_meter: Number,
        objectid: Number,
        name: String
    },
    name: String
});

const Peak = mongoose.model('peak', peakSchema);

module.exports = Peak;