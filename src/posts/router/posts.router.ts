import { Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import { getPostListHandler } from "./handler/get-post-list.handler";
import { getPostHandler } from "./handler/get-post.handler";
import { createPostHandler } from "./handler/create-post.handler";
import { updatePostHandler } from "./handler/update-post.handler";
import { deletePostHandler } from "./handler/delete-post.handler";
import { idValidation } from "../../core/middlewares/validation/params-id.validation.middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";
import { postInputDtoValidation } from "../validation/post.unput-dto.validation-middlewares";

export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTES.ROOT, getPostListHandler)

    .get(
        POSTS_ROUTES.BY_ID,
        idValidation,
        inputValidationResultMiddleware,
        getPostHandler,
    )

    .post(
        POSTS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        createPostHandler
    )

    .put(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        updatePostHandler)

    .delete(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deletePostHandler
    );
