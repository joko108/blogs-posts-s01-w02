import { Request, Response } from "express";
import { BlogInputDto } from "../../dto/blog.input.dto";
import { Blog } from "../../types/blog";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";

/*
Контроллер на обновление, не знает, что происходит в БД,
его задача: принять запрос, перенаправить в репозиторий,
получить данные из репозитория, вернуть респонс.
*/
export function createBlogHandler(
    req: Request<{}, {}, BlogInputDto>,
    res: Response
) {
    const newBlog: Omit<Blog, 'id'> = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };

    const createdBlog = blogsRepository.create(newBlog);
    res.status(HttpStatus.Created_201).send(createdBlog);
}
