const User = require('./../models/user');

module.exports = {
    peaksCompleted: async (req, res, next) => {
       return User.find().then(user => {
            var userMap = [];

            user.forEach(function (user,idx) {
                userMap.push({userId:user._id, peaks:user.peaksCompleted});
            });

            res.send(userMap);
            return userMap
        });

    }
}