import { body } from "express-validator";
import {validateErrors, validateErrorsWhitoutFiles} from './validate_errors.js'
import { cellarExist, existEmail, existIN, goodSupervisor } from "../utils/db_validators.js";

export const userValidator = [
    body('name','Name cannot be empty').notEmpty(),
    body('lastName','Last Name is required').notEmpty(),
    body('age','Age is required').notEmpty(),
    body('email','Email is required').notEmpty().isEmail().toLowerCase().custom(existEmail),
    body('identificationNumber','Identification number is required').notEmpty().isLength({max:7}).custom(existIN),
    body('password','Password is required').notEmpty(),
    body('role','Role is required').notEmpty().toLowerCase(),
    validateErrors
]

export const materialValidator = [
    body('name','Name is required').notEmpty(),
    body('description','Category is required').notEmpty().isLength({max:400}).withMessage('Cant overcome 400 characters'),
    body('category','Category is required').optional().notEmpty().toLowerCase(),
    body('stock','Stock is required').notEmpty(),
    body('createdAt','Date of creation is required').optional().notEmpty(),
    body('cellar','Cellar is required').notEmpty().custom(cellarExist),
    body('updatedAt','Update date is required').optional().notEmpty(),
    validateErrors
]

export const cellarValidator = [
    body('name','Name is required').notEmpty(),
    body('supervisors','A supervisor/s is required').notEmpty().custom(goodSupervisor),
    validateErrorsWhitoutFiles
]


//Update
export const updatedUserValidator = [
    body('name','Name cannot be empty').optional().notEmpty(),
    body('lastName','Last Name is required').optional().notEmpty(),
    body('age','Age is required').optional().notEmpty(),
    body('email','Email is required').optional().notEmpty().isEmail().toLowerCase().custom(existEmail),
    body('identificationNumber','Identification number is required').optional().notEmpty().isLength({max:7}).custom(existIN),
    validateErrorsWhitoutFiles
]

export const updatedMaterialValidator = [
    body('name','Name is required').optional().notEmpty(),
    body('description','Category is required').optional().notEmpty().isLength({max:400}).withMessage('Cant overcome 400 characters'),
    body('category','Category is required').optional().optional().notEmpty().toLowerCase(),
    body('stock','Stock is required').optional().notEmpty(),
    body('cellar','Cellar is required').optional().notEmpty().custom(cellarExist),
    validateErrors
]