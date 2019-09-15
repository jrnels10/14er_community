const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            dropDups: true
        },
        password: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        homeTown: {
            type: String,
        },
        homeState: {
            type: String,
        },
        profilePicture: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        homeTown: {
            type: String,
        },
        homeState: {
            type: String,
        },
        profilePicture: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        homeTown: {
            type: String,
        },
        homeState: {
            type: String,
        },
        profilePicture: {
            type: String
        }
    },
    peaksCompleted: [{
        peakName: {
            type: String
        },
        dateCompleted: {
            type: Date
        }
    }]
    // index: { unique: true }
});

// userSchema.plugin(uniqueValidator)
userSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        console.log(this.local.password)
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHashed;
        console.log('hashed password:', this.local.password)

        next();
    } catch (error) {
        next(error)
    }
});
userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        console.log(newPassword + "," + this.local.password)
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

// create model
const User = mongoose.model('user', userSchema);
// const val = User.collection.
// console.log(val)
//export model
module.exports = User;