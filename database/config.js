const mongoose = require ('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log('Database Online!!')

    } catch (error) {
        console.log(error)
        throw new Error('Error on connecting to database!!')
    }
}

module.exports = {
    dbConnection
}