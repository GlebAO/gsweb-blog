export default {
    PER_PAGE: 10,
    LOCALE: 'ru-RU',
    entities: {
        PUBLIC_POSTS: 'publicPosts',
        PUBLIC_POSTS_FOR_TAG: (tag:string) => `publicPostsFor${tag}`,
        OWN_POSTS: 'ownPosts',
        ADMIN_POSTS: 'adminPosts',
        ADMIN_USERS: 'adminUsers',
        
    }
}