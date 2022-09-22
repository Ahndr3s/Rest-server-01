

const {model, Schema} = require('mongoose')

const RoleSchema = Schema({
    role:{
        type: String,
        required : [true, 'You must enter a role']
    }
})

module.exports= model('Role', RoleSchema)