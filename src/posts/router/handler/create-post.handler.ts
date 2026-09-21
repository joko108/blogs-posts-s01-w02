import { Request, Response } from "express";
import { PostInputDto } from "../../dto/post.input.dto";
import { Post } from "../../types/post";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repository/posts.repository";

export function createPostHandler(
    req: Request<{}, {}, PostInputDto>,
    res: Response
) {
    const newPost: Omit<Post, 'id' | 'blogName'> = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
    };

    const createdPost = postsRepository.createPost(newPost);
    res.status(HttpStatus.Created_201).send(createdPost);
}
