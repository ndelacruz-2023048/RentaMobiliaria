import User from '../src/User/user_model.js'
import Cellar from '../src/Cellar/cellar_model.js'
export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}
export const existIN = async (IN) => {
    const alreadyExist = await User.findOne({identificationNumber:IN})
    if(alreadyExist){
        console.error(`Identification number ${IN} is already taken`)
        throw new Error(`Identification number ${IN} is already taken`)
    }
}

export const cellarExist = async(cellar)=>{
    const exist = await Cellar.findById(cellar)
    if(!exist){
        console.error(`Cellar not found`)
        throw new Error(`Cellar not found`)
    }
}

export const goodSupervisor = async(list)=>{
    for(let i = 0;i<list;i++){
        const user = await User.findById(list[i])
        if(!user){
            console.error(`User not found`)
            throw new Error(`User not found`)
        }else if(user.role !== 'teacher' || user.role !== 'principal'){
            console.error(`The user is not a teacher or a principal`)
            throw new Error(`The user is not a teacher or a principal`)
        }
    }
}