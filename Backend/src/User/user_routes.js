import { Router } from "express";
import {limiter} from '../../middlewares/rate_limit.js'
import { changePassword, changeProfilePicture, changeRol, deleteUser, findByIN, getUser, getUsers, updateUser } from "./user_controller.js";
import { isPrincipal, validateJwt } from "../../middlewares/validate_jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer_upload.js";
import { deleteFileOnError } from "../../middlewares/delete_file_on_errors.js";
import { updatedUserValidator } from "../../middlewares/validators.js";
const api = Router()
//Admin
api.get('/getUsers',[validateJwt,isPrincipal,limiter],getUsers)
api.put('/change-rol/:id',[validateJwt,isPrincipal,limiter],changeRol)
api.get('/find-by-in/:IN',[validateJwt,isPrincipal,limiter],findByIN)
api.put('/update-user/:id',[validateJwt,updatedUserValidator,limiter],updateUser)
api.get('/find-user/:id',[validateJwt,isPrincipal,limiter],getUser)
api.delete('/delete/:id',[validateJwt,isPrincipal,limiter],deleteUser)
//Funciones para Todos
api.put('/change-password',[validateJwt,limiter], changePassword)
api.put('/change-profile-picture',[validateJwt,uploadProfilePicture.single('profilePicture'),deleteFileOnError,limiter],changeProfilePicture)
api.put('/update-profile',[validateJwt,updatedUserValidator,limiter],updateUser)
export default api