import { Post } from "../types/post";
import { db } from "../../db/in-memory.db";

export const postsRepository = {
    // Возвращаем все блоги
    findAllPosts(): Post[] {
        return db.posts;
    },

    // Возвращаем конкретный блог по id
    findPostById(id: string): Post | null {
        return db.posts.find((b) => b.id === id) ?? null;
    },

    // Создание блога, без поля id (id генерируется здесь)
    createPost(post: Omit<Post, 'id' | 'blogName'>): Post | null {
        const blog = db.blogs.find(b => b.id === post.blogId);

        // !!!!!!!!!!!!!
        if(!blog) { // !!!!!!!!!
            return null; // !!!!!!!!!!!!!
        }

        // id последнего блога
        const lastPost = db.posts[db.posts.length - 1];
        const nextId = lastPost ? lastPost.id + 1 : 1; // Генерируем id

        const created: Post = {
            id: String(nextId),
            ...post,
            blogName: blog.name,
        };

        db.posts.push(created);
        return created;
    },

    updatePost(id: string, post: Omit<Post, 'id' | 'blogName'>): boolean {
        // Извлекаем id блога, который прислал клиент
        const index = db.posts.findIndex((b) => b.id === id);
        if (index === -1) {
            return false;
        }

        // Заменяем поля
        db.posts[index] = { ...db.posts[index], ...post };
        return true;
    },

    deletePost(id: string): boolean {
        const index = db.posts.findIndex((b) => b.id === id);
        if (index === -1) {
            return false;
        }

        // Удаляем блог по его id
        db.posts.splice(index, 1);
        return true;
    },
};
