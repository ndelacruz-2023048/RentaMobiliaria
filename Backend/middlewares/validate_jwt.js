//Validar los tokens
'use strict'

import jwt from 'jsonwebtoken'
//Es middleware si lleva el next()
export const validateJwt = async(req,res,next)=>{
    try {
        //Obtener la llave de acceso privada al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers
        let { authorization } =   req.headers
        //Verificamos que vengta el token
        if(!authorization) return res.status(401).send({message: 'Unautorized'})
        let user = jwt.verify(authorization, secretKey)
        //Inyectar en la solicitud un nuevo parametro
        req.user = user
        //next() = todo salio bien por aca que pase a la siguiente funcion
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

export const isPrincipal = async(req,res,next)=>{
    try {
        const {user}=req
        if(!user || user.role !== 'principal') return res.status(403).send({success:false,message:'You dont have access'})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message: 'Error whit authorization'})
    }
}