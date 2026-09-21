import { Blog } from "../types/blog";
import { db } from "../../db/in-memory.db";

export const blogsRepository = {
    // Возвращаем все блоги
    findAll(): Blog[] {
        return db.blogs;
    },

    // Возвращаем конкретный блог по id
    findById(id: number): Blog | null {
        return db.blogs.find((b) => b.id === id) ?? null;
    },

    // Создание блога, без поля id (id генерируется здесь)
    create(newBlog: Omit<Blog, 'id'>): Blog {
        // id последнего блога
        const lastBlog = db.blogs[db.blogs.length - 1]
        const created: Blog = {
            id: lastBlog ? lastBlog.id + 1 : 1, // Генерируем id
            ...newBlog,
        };

        db.blogs.push(created);
        return created;
    },

    update(id: number, blog: Omit<Blog, 'id'>): boolean {
        // Извлекаем id блога, который прислал клиент
        const index = db.blogs.findIndex((b) => b.id === id);
        if (index === -1) {
            return false;
        }

        // Заменяем поля
        db.blogs[index] = { ...db.blogs[index], ...blog };
        return true;
    },

    delete(id: number): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);
        if (index === -1) {
            return false;
        }

        // Удаляем блог по его id
        db.blogs.splice(index, 1);
        return true;
    },
};
