const joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            // console.log("validate",req.body)
            const result = joi.validate(req.body, schema);
            console.log("result",result)
            if (result.error) {
                return res.status(400).json(result.error);
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schema: {
        authSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
            firstName: joi.string(),
            lastName: joi.string(),
            homeTown:joi.string(),
            homeState:joi.string(),
            profilePicture:joi.string()
        })
    }
}