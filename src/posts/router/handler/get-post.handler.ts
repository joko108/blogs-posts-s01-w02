import { Request, Response } from "express";
import { postsRepository } from "../../repository/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export function getPostHandler(req: Request<{ id: string }>, res: Response) {
    const post = postsRepository.findPostById(req.params.id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{ message: 'Post not found', field: 'id' }])
            );

        return;
    }

    res.status(HttpStatus.Ok_200).send(post);
}
