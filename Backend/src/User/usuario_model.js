import { model, Schema } from "mongoose";

const userSchema = Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required'],
    },
    age:{
        type:Number,
        required:[true, 'Age is required'],
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
    },
    type:{
        type:String,
        enum:['admin','client'],
        default:'client',
    }
})

export default model('User',animalSchema)