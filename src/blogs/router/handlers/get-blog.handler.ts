import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export function getBlogHandler(req: Request<{ id: string }>, res: Response) {
    const blog = blogsRepository.findById(+req.params.id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{ message: 'Blog not found', field: 'id'}])
            );

        return;
    }

    res.status(HttpStatus.Ok_200).send(blog);
}
