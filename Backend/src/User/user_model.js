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
    identificationNumber:{
        type:Number,
        required:[true, 'Identification number is required'],
        maxlength:7,
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
    },
    role:{
        type:String,
        enum:['teacher','estudent','principal'],
        lowercase:true,
        default:'estudent',
    },
    profilePicture:{
        type:String,
    }
})

userSchema.methods.toJSON = function(){
    const {__v,password,...user}=this.toObject()
    return user
}

export default model('User',userSchema)