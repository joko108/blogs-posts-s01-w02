import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";

export const db = {
    blogs: <Blog[]>[
        {
            id: 1,
            name: 'it-blogger',
            description: 'about it',
            websiteUrl: 'https://it-blogger.com'
        },
        {
            id: 2,
            name: 'just-blog',
            description: 'just blog about nothing',
            websiteUrl: 'https://just-blog.io',
        },
    ],
    posts: <Post[]>[],
};
