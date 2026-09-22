import { Request, Response } from "express";
import { postsRepository } from "../../repository/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";

// Хендлер на удаление поста по is, за БД не отвечает, только отправляет респонс клиенту
export function deletePostHandler(req: Request<{ id: string }>, res: Response) {
    const isDeleted = postsRepository.deletePost(req.params.id);

    // Если из репозитория вернулось false, отправляем сообщение об ошибке
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
