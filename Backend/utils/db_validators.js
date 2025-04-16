import User from '../src/User/user_model.js'

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