import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

export function deleteBlogHandler(req: Request<{ id: string }>, res: Response) {
    const isDeleted = blogsRepository.delete(req.params.id);

    if (!isDeleted) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{ message: 'Blog not found', field: 'id'}])
            );
        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
}
