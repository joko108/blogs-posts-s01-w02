import { Post } from "../types/post";
import { db } from "../../db/in-memory.db";

export const postsRepository = {
    // Возвращаем все блоги
    findAllPosts(): Post[] {
        return db.posts;
    },

    // Возвращаем конкретный блог по id
    findPostById(id: number): Post | null {
        return db.posts.find((b) => b.id === id) ?? null;
    },

    // Создание блога, без поля id (id генерируется здесь)
    createPost(newPost: Omit<Post, 'id'>): Post {
        // id последнего блога
        const lastPost = db.posts[db.posts.length - 1]
        const created: Post = {
            id: lastPost ? lastPost.id + 1 : 1, // Генерируем id
            ...newPost,
        };

        db.posts.push(created);
        return created;
    },

    updatePost(id: number, post: Omit<Post, 'id'>): boolean {
        // Извлекаем id блога, который прислал клиент
        const index = db.posts.findIndex((b) => b.id === id);
        if (index === -1) {
            return false;
        }

        // Заменяем поля
        db.posts[index] = { ...db.posts[index], ...post };
        return true;
    },

    deletePost(id: number): boolean {
        const index = db.posts.findIndex((b) => b.id === id);
        if (index === -1) {
            return false;
        }

        // Удаляем блог по его id
        db.posts.splice(index, 1);
        return true;
    },
};
