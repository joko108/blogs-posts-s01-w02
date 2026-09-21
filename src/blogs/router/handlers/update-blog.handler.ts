import { BlogInputDto } from "../../dto/blog.input.dto";
import { blogsRepository } from "../../repositories/blogs.repository";
import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export function updateBlogHandler(
    req: Request<{ id: string }, {}, BlogInputDto>,
    res: Response
) {
    const isUpdate = blogsRepository.update(req.params.id, req.body);

    if (!isUpdate) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{ message: 'Blog not found', field: 'id'}])
            );

        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
}
