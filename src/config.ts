export default {
    PER_PAGE: 10,
    LOCALE: 'ru-RU',
    entities: {
        PUBLIC_POSTS: 'publicPosts',
        PUBLIC_COMMENTS_FOR_ENTITY:(commentableId:number | string, commentableType: string) => `commentsFor${commentableType}${commentableId}`,
        PUBLIC_POSTS_FOR_TAG: (tag:string) => `publicPostsFor${tag}`,
        OWN_POSTS: 'ownPosts',
        ADMIN_POSTS: 'adminPosts',
        ADMIN_USERS: 'adminUsers',
        ADMIN_COMMENTS: 'adminComments',
        ADMIN_TAGS: 'adminTags'
    },
    detailedEntities: {
        POSTS: 'posts',
        COMMENTS: 'comments'
    }
}