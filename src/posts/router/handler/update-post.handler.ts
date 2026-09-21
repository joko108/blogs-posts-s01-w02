import { PostInputDto } from "../../dto/post.input.dto";
import { postsRepository } from "../../repository/posts.repository";
import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export function updatePostHandler(
    req: Request<{ id: string }, {}, PostInputDto>,
    res: Response
) {
    const isUpdated = postsRepository.updatePost(+req.params.id, req.body);

    if (!isUpdated) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{ message: 'Blog not found', field: 'id' }])
            );

        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
}
