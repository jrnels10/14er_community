const User = require('./../models/user');

module.exports = {
    getAll: async (req, res, next) => {
       return User.find().then(user => {
            var userMap = [];

            user.forEach(function (user,idx) {
                userMap.push({userId:user._id, peaks:user.peaksCompleted});
            });

            res.send(userMap);
            console.log(userMap)
            return userMap
        });

    }
}