import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repository/posts.repository";

export function getPostListHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok_200).send(postsRepository.findAllPosts());
}
