import { body } from "express-validator";
import {validateErrors} from './validate_errors.js'
import { existEmail, existIN } from "../utils/db_validators.js";

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