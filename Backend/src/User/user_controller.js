import User from './user_model.js'
import {checkPassword, encrypt} from '../../utils/encrypt.js'
import { join} from 'path'
import { unlink } from 'fs/promises'
export const getUsers=async(req,res)=>{
    try {
        const {limit =20, skip=0} =req.query
        const users = await User.find().skip(skip).limit(limit)
        if(users.length === 0) return res.status(404).send({success:false,message:'Users not found'})
        console.log(users);
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
        return res.status(500).send({success:false,message: 'General error showing the User'})
    }
}

export const changePassword =async(req,res)=>{
    try {
        let {uid} = req.user
        let {newPassword,oldPassword}= req.body
        let user = await User.findById(uid)
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
 asignar bodegas a usuarios de tipo teacher
 */

export const changeProfilePicture = async(req,res,error)=>{
    try {
        if(req.file && req.filePath){
                const user = await User.findOne({_id:req.user.uid})
                const filePath = join(req.filePath, user.profilePicture)
                try{
                    console.log(filePath);
                    await unlink(filePath)
                    user.profilePicture = req.file.filename
                    await user.save()
                    return res.send({success:true,message:'Profile picture changed'})
                }catch(unlinkErr){
                    console.error('Error deleting file', unlinkErr)
                }
            }
            if(error.status === 400 || error.errors){ // === estricto | == abstracto
                return res.status(400).send(
                    {
                        success: false,
                        message: 'Error registering user',
                        error
                    }
                )
            }
            return res.status(500).send(
                {
                    success: false,
                    message: error.message
                }
            )
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message: 'General error showing the User'})
    }
 }

export const changeRol = async(req,res)=>{
    try {
        const {id}=req.params
        const {rol} = req.body
        let user = await User.findByIdAndUpdate(id,{role:rol},{new:true})
        console.log(user);
        
        if(!user) return res.status(404).send({success:false,message:'User not found'})
        return res.send({success:true,message:`Rol successfully changed to ${rol}`})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message: 'General error showing the User'})
    }
}
