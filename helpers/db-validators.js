const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async(role = '') => {
    const  roleExist = await Role.findOne({role})
    if( !roleExist ){
        throw new Error(`The role ${role} doesnt exists!!`)
    }
}

const doesEmailExists = async(email = '') => {
    const emailExist =  await User.findOne({email})
    if(emailExist){
        throw new Error(`That email ${email} already exists!!`)
    }
}

const doesUserByIdExists = async( id = '') => {
    const userExist =  await User.findById(id)
    if(!userExist){
        throw new Error(`The user with id ${id} doesnt exists!!`)
    }
}


module.exports = {
    isValidRole, doesEmailExists, doesUserByIdExists
} 