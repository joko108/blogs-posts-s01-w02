import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../settings/config";

export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Извлекаем строку авторизации: 'Basic xxxx'
    const auth = req.headers['authorization'] as string;

    if (!auth) {
        res.sendStatus(HttpStatus.Unauthorized_401);
        return;
    }

    // Отделяем Basic от логина/пароля
    const [authType, token] = auth.split(' ');

    // Проверяем, что действительно Basic авторизация
    if (authType !== 'Basic') {
        res.sendStatus(HttpStatus.Unauthorized_401);
        return;
    }

    // Декодируем логин/пароль в utf-8 формат
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':'); // Отделяем логин от пароля

    // Сверяем логин и пароль
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(HttpStatus.Unauthorized_401);
        return;
    }

    next();
};
