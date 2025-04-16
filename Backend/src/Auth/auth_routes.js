import { Router } from "express";
import {limiter} from '../../middlewares/rate_limit.js'
import {login, register} from './auth_controller.js'
import { userValidator } from "../../middlewares/validators.js";
import {uploadProfilePicture} from '../../middlewares/multer_upload.js'
import {deleteFileOnError} from '../../middlewares/delete_file_on_errors.js'
const api = Router()
api.post('/register',[uploadProfilePicture.single('profilePicture'),userValidator,deleteFileOnError,limiter,],register)
api.post('/login',limiter,login)
export default api