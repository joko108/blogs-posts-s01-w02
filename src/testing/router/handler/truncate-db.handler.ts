import { Request, Response } from "express";
import { db } from "../../../db/in-memory.db";
import { HttpStatus } from "../../../core/types/http-statuses";

export const truncateDbHandler = (req: Request, res: Response) => {
    db.blogs = [];
    res.sendStatus(HttpStatus.NoContent_204);
};
