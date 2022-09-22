const {Schema, model} = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'You must enter a name']
    },
    email: {
        type: String,
        required: [true, 'You must enter an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'You must enter a password']
    },
    img: {
        type: String,        
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true 
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject()
    return user
}

module.exports = model('User', userSchema)