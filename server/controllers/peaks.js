const User = require('./../models/user');
const Peak = require('./../models/peaks');

module.exports = {
    peaksCompleted: async (req, res, next) => {
        return User.find().then(user => {
            var userMap = [];

            user.forEach(function (user, idx) {
                userMap.push({ userId: user._id, peaks: user.peaksCompleted });
            });

            res.send(userMap);
            return userMap
        });
    },
    peaksDetails: async (req, res, next) => {
        return Peak.find().then(peak => {
            console.log(peak)
            res.send(peak);
        })
    },
    peaksUpdate: async (req, res, next) => {
        const foundPeak = await Peak.findOne({ "name": req.body.name })
        if (foundPeak) {
            let completedArray = req.body.data.completed ? [...foundPeak.attribute.completed.userCompleted, req.body.data.completed] : [...foundPeak.attribute.completed.userCompleted];
            let plannedArray = req.body.data.planned ? [...foundPeak.attribute.planned.userPlanned, req.body.data.planned] : [...foundPeak.attribute.planned.userPlanned];
            let difficultyArray = req.body.data.difficulty ? [...foundPeak.attribute.difficulty.userDifficulty, req.body.data.difficulty] : [...foundPeak.attribute.difficulty.userDifficulty];
            // console.log("difficultyArray", difficultyArray)

            let avgDifficulty = difficultyArray.map(user => {
                if (user.difficulty > 0) {
                    return user.difficulty
                }
            }).reduce((total, num) => { return total + num }) / difficultyArray.length;
            let sumCompleted = foundPeak.attribute.completed.completedCount + 1;
            // console.log(avgDifficulty)
            const dataEntry = req.body.data.completed ? {
                "completed": {
                    "userCompleted": completedArray,
                    "completedCount": sumCompleted
                },
                "planned": {
                    "userPlanned": foundPeak.attribute.planned.userPlanned
                },
                "difficulty": {
                    "userDifficulty": difficultyArray,
                    "avgDifficulty": avgDifficulty
                }
            } : {
                    "completed": {
                        "userCompleted": foundPeak.attribute.completed.userCompleted,
                        "completedCount": foundPeak.attribute.completed.completedCount
                    },
                    "planned": {
                        "userPlanned": plannedArray
                    },
                    "difficulty": {
                        "userDifficulty": foundPeak.attribute.difficulty.userDifficulty,
                        "avgDifficulty": foundPeak.attribute.difficulty.avgDifficulty
                    }
                }
            Peak.findOneAndUpdate({ "name": req.body.name }, {
                "attribute": dataEntry
            }).then(function () {
                Peak.findOne({ "name": req.body.name }).then(function (item) {
                    res.send(item)
                });
            })
        }
        else {
            // console.log(req.body)
            let completedCount = req.body.data.completed ? 1 : 0;
            let userDifficulty = req.body.data.difficulty.difficulty ? req.body.data.difficulty.difficulty : 0;
            const entryData = req.body.data.completed ? {
                completed: {
                    userCompleted: req.body.data.completed,
                    completedCount: completedCount
                },
                planned: {
                    userPlanned: []
                },
                difficulty: {
                    userDifficulty: [req.body.data.difficulty],
                    avgDifficulty: userDifficulty
                }
            } : {
                completed: {
                    userCompleted: [],
                    completedCount: completedCount
                },
                planned: {
                    userPlanned: req.body.data.planned
                },
                difficulty: {
                    userDifficulty: [],
                    avgDifficulty: userDifficulty
                }
            }
            const newPeak = new Peak({
                name: req.body.name,
                attribute: entryData
            });
            await newPeak.save();
            res.send(newPeak)
        }
    },
}