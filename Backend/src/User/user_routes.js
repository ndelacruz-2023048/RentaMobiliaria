import { Router } from "express";
import {limiter} from '../../middlewares/rate_limit.js'
import { changePassword, changeProfilePicture, changeRol, getUsers } from "./user_controller.js";
import { isPrincipal, validateJwt } from "../../middlewares/validate_jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer_upload.js";
import { deleteFileOnError } from "../../middlewares/delete_file_on_errors.js";
const api = Router()
//Admin
api.get('/getUsers',[validateJwt,isPrincipal,limiter],getUsers)
api.put('/change-rol/:id',[validateJwt,isPrincipal,limiter],changeRol)
//Funciones para Todos
api.put('/change-password',[validateJwt,limiter], changePassword)
api.put('/change-profile-picture',[validateJwt,uploadProfilePicture.single('profilePicture'),deleteFileOnError,limiter],changeProfilePicture)

export default api