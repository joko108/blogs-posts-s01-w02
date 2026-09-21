import { Request, Response } from "express";
import { postsRepository } from "../../repository/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export function deletePostHandler(req: Request<{ id: string }>, res: Response) {
    const isDeleted = postsRepository.deletePost(req.params.id);

    if (!isDeleted) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{ message: 'Post not found', field: 'id' }])
            );

        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
}
