// Формат ошибки
export type ValidationErrorType = {
    message: string,
    field: string,
};

// Формат тела ответа об ошибке при непрохождении валидации
export type ValidationErrorDto = { errorsMessages: ValidationErrorType[] };
