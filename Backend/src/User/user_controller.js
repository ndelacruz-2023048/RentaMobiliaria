import User from './user_model.js'
import {checkPassword, encrypt} from '../../utils/encrypt.js'
export const getUsers=async(req,res)=>{
    try {
        const {limit =20, skip=0} =req.query
        const users = User.find().skip(skip).limit(limit)
        if(users.length === 0) return res.status(404).send({success:false,message:'Users not found'})
        return res.send({success:true,message:users})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General error showing the users'})
        
    }
}

export const getUser = async(req,res)=>{
    try {
        let {id} = req.params
        let user = await User.findById(id)
        if(!user) return res.status(404).send({success:false,message:'The user does not exists or the id is wrong'})
        return res.send({success:true,message:user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message: 'General error showing the User'})
    }
}

export const updateUser = async(req,res)=>{
    try {
        let { id } = req.params
        let data = req.body
        data.role = req.user.role
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )
        if(!update) return res.status(404).send(
            {
                success:false,
                message:'User not found'
            }
        )
        return res.send({success:true,message:'User updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message: 'General error showing the User'})
    }
}

export const deleteUser = async(req,res)=>{
    try {
        let {id} = req.params
        let user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).send({success: false,message:'The user does not exists or the id is wrong'})
        return res.send({success:true,message:'User deleted: ',user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:true,message: 'General error showing the User'})
    }
}

export const changePassword =async(req,res)=>{
    try {
        let {id} = req.params
        let {newPassword,oldPassword}= req.body
        let user = await User.findById(idUsuario)
        if(user && await checkPassword(user.password,oldPassword)){
            user.password = await encrypt(newPassword)
            await user.save()
            return res.send({success:false,message:'Password changed succesfully'})
        }
        return res.status(404).send({success:true,message:'The user does not exists or the password is wrong'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message: 'General error updating the password'})
    }
}

/* Falta:
 Funcion para cambiar la foto de perfil 
 Cambiar rol a usuarios
 asignar bodegas a usuarios de tipo teacher
 */