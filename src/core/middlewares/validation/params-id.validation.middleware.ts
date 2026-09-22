import { param } from "express-validator";

// Отдельный валидатор ID
export const idValidation = param('id')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isNumeric()
    .withMessage('must be a numeric string');
