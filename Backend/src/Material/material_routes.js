import { Router } from "express";
import {validateJwt, isPrincipal} from '../../middlewares/validate_jwt.js'
import {limiter} from '../../middlewares/rate_limit.js'
import { createMaterial, deleteMaterial, getMaterial, getMaterials, updateMaterial } from "./material_controller.js";
import { materialValidator, updatedMaterialValidator } from "../../middlewares/validators.js";
import { uploadMaterialPicture } from "../../middlewares/multer_upload.js";
import {deleteFileOnError} from '../../middlewares/delete_file_on_errors.js'
const api = Router()
//Funciones solo para Admin
api.post('/add',[uploadMaterialPicture.single('image'),validateJwt,isPrincipal,materialValidator,deleteFileOnError,limiter],createMaterial)
api.put('/update/:id',[validateJwt,isPrincipal,uploadMaterialPicture.single('image'),updatedMaterialValidator,deleteFileOnError],updateMaterial)
api.delete('/delete/:id',[validateJwt,isPrincipal,limiter],deleteMaterial)
//Funciones solo para Alumnos


//Funciones para Maestros


//Funciones Para Todos
api.get('/get-materials',[validateJwt,limiter],getMaterials)
api.get('/get-material/:id',[validateJwt,limiter], getMaterial)
export default api