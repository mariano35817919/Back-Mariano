const { default: mongoose } = require('mongoose')
const moongose = require ('mongoose')


const UserSchema = new moongose.Schema ({

        user:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        }
    })

const User = mongoose.model('User',UserSchema)

module.exports = User