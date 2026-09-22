import { Request, Response } from "express";
import { db } from "../../../db/in-memory.db";
import { HttpStatus } from "../../../core/types/http-statuses";

// Зачищаем базу (для тестов)
export const truncateDbHandler = (req: Request, res: Response) => {
    db.blogs = [];
    db.posts = [];
    res.sendStatus(HttpStatus.NoContent_204);
};
