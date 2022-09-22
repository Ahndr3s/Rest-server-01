const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const usersGet = async(req = request, res = response) => {

    //OPTIONAL ARGUMENTS
    const { limit = 5, from = 0 } = req.query
    // EXTRACTING AL RECORDS WITH status: true
    const queryFilter = {status: true}


    // EXECUTE BOTH PROMISES SIMULTANEOUSLY TO GET THE PROPER RESULT TO PRINT IT BELLOW
    // ALSO IS IS FATSTER THAN MAKING BOTH SEPARETELLY
    const [total, users] = await Promise.all([
        User.countDocuments(queryFilter),
        User.find(queryFilter)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const userPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...whatsLeft } = req.body

    // TODO VALIDATE AGAINST DATABASE
    if(password){
        // ENCRYPT PASSWORD
        const salt = bcryptjs.genSaltSync()
        whatsLeft.password = bcryptjs.hashSync(password, salt)
    }

    const userDb = await User.findOneAndUpdate(id, whatsLeft, {new:true})

    res.json(userDb)
}

const userPost = async(req, res = response) => { //CREATE A RECORD

    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})
    
    // ENCRYPT PASSWORD
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    // SAVE RECORDING
    await user.save()

    res.json({
        msg: 'post API Petition',
user
    })
}

const userDelete = async(req, res = response) => {
    const {id} =req.params
    
    // PHYSICAL DELITING
    /* DONT DO IT IF THE USER CAN MANIPULATE THE DB SO WE
       CAN KEEP THE REFERENCES TO IT'S MOVEMENTS */
    // const deletedUser = await User.findByIdAndDelete(id)

    // SYMBOLIC DELITING
    const deletedUser = await User.findByIdAndUpdate(id, {status:false})
    
    res.json(deletedUser)
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API Petition'
    })
}


module.exports = {
    usersGet, userPut, userPost, userDelete, userPatch
}