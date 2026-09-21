// Данные от клиента для создания/обновления поста
export type PostInputDto = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: number;
};
