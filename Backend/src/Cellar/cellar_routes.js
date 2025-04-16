import { Router } from "express";
import {isPrincipal, validateJwt} from '../../middlewares/validate_jwt.js'
import { createCellar, getCellars } from "./cellar_controller.js";
import {limiter} from '../../middlewares/rate_limit.js'
import {cellarValidator} from '../../middlewares/validators.js'
const api = Router()

//Funciones para Admin
api.post('/add',[validateJwt,isPrincipal,cellarValidator,limiter],createCellar)
api.get('/getCellars',[validateJwt,isPrincipal,limiter],getCellars)
export default api