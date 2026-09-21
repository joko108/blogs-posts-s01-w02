import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";

export function getBlogListHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok_200).send(blogsRepository.findAll());
}
