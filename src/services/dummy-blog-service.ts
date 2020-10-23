import PostModel, { PostStatus } from "../types/PostModel";
import UserModel, { UserRole, UserStatus } from "../types/UserModel";
import { BlogServiceInterface, UserFormValues } from "./types"
import { PostFormValues } from "../components/post/post-form/post-form"
import TagModel from "../types/TagModel";
import { CommentsFormValuesInterface } from "../components/comments/comments-form";
import CommentModel, { CommentTypes } from "../types/CommentModel";

export default class DummyBlogService implements BlogServiceInterface {

    _posts: PostModel[] = [
        { id: 1, title: 'Dummy first post', slug: 'slug1', content: 'We open a blog first time', createdAt: 'sdas', updatedAt: 'sdadsd', userId: 1, status: PostStatus.ACTIVE, user: { name: 'john' } },
        { id: 2, title: 'Dummy second post', slug: 'slug2', content: 'My second post is better than first', createdAt: 'sdas', updatedAt: 'sdadsd', userId: 1, status: PostStatus.DRAFT, user: { name: 'john' } }
    ]

    _users: UserModel[] = [
        { id: 1, name: "John", email: "john@mail.com", role: UserRole.ADMIN, createdAt: '', status: UserStatus.ACTIVE, lastLoggedIn: 2132312 },
        { id: 2, name: "Doe", email: "doen@mail.com", role: UserRole.GUEST, createdAt: '', status: UserStatus.ACTIVE, lastLoggedIn: 12312123 }
    ]

    _tags: TagModel[] = [
        { id: 1, title: "super_tag", slug: "super-tag", score: 10 }
    ]

    _children2: CommentModel[] = [
        {
            id: 7,
            commentableType: CommentTypes.POST,
            postId: 234,
            author: {
                name: "Smith L12",
            },
            userId: 12,
            content:
                "Разнообразный и богатый опыт сложившаяся структура организации играет важную роль в формировании соответствующий условий активизации. Повседневная практика показывает, что консультация с широким активом влечет за собой процесс внедрения и модернизации форм развития. Задача организации, в особенности же консультация с широким активом требуют от нас анализа форм развития. С другой стороны дальнейшее развитие различных форм деятельности требуют определения и уточнения модели развития. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений.",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
            parentId: 2
        },
    ];

    _children1: CommentModel[] = [
        {
            id: 5,
            commentableType: CommentTypes.POST,
            postId: 234,
            author: {
                name: "Jordan L12",
            },
            userId: 12,
            content:
                "Разнообразный и богатый опыт сложившаяся структура организации играет важную роль в формировании соответствующий условий активизации. Повседневная практика показывает, что консультация с широким активом влечет за собой процесс внедрения и модернизации форм развития. Задача организации, в особенности же консультация с широким активом требуют от нас анализа форм развития. С другой стороны дальнейшее развитие различных форм деятельности требуют определения и уточнения модели развития. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений.",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
            parentId: 1
        },
        {
            id: 6,
            commentableType: CommentTypes.POST,
            postId: 234,
            userId: 12,
            author: {
                name: "Melissa L12",
            },
            content:
                "С другой стороны реализация намеченных плановых заданий позволяет выполнять важные задания по разработке дальнейших направлений развития. С другой стороны укрепление и развитие структуры позволяет оценить значение новых предложений. Задача организации, в особенности же рамки и место обучения кадров способствует подготовки и реализации существенных финансовых и административных условий. Повседневная практика показывает, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание систем массового участия. Равным образом начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же сложившаяся структура организации в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. ",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
            parentId: 1
        },
    ];

    _comments: CommentModel[] = [
        {
            id: 1,
            commentableType: CommentTypes.POST,
            postId: 234,
            author: {
                name: "Gleb L1",
            },
            userId: 12,
            content:
                "Таким образом реализация намеченных плановых заданий способствует подготовки и реализации форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям.",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
            children: this._children1,
        },
        {
            id: 2,
            commentableType: CommentTypes.POST,
            postId: 234,
            userId: 12,
            author: {
                name: "John L1",
            },
            content:
                "Таким образом реализация намеченных плановых заданий способствует подготовки и реализации форм развития. Идейные соображения высшего порядка, а также рамки и место обучения кадров способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям.",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
            children: this._children2,
        },
        {
            id: 3,
            commentableType: CommentTypes.POST,
            postId: 234,
            userId: 12,
            author: {
                name: "Alex L1",
            },
            content:
                "Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки новых предложений. Разнообразный и богатый опыт укрепление и развитие структуры требуют от нас анализа форм развития. Товарищи! реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Таким образом новая модель организационной деятельности играет важную роль в формировании дальнейших направлений развития.",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
        },
        {
            id: 4,
            commentableType: CommentTypes.POST,
            postId: 234,
            userId: 12,
            author: {
                name: "Nataliya L1",
            },
            content:
                "Разнообразный и богатый опыт сложившаяся структура организации играет важную роль в формировании соответствующий условий активизации. Повседневная практика показывает, что консультация с широким активом влечет за собой процесс внедрения и модернизации форм развития. Задача организации, в особенности же консультация с широким активом требуют от нас анализа форм развития. С другой стороны дальнейшее развитие различных форм деятельности требуют определения и уточнения модели развития. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений.",
            createdAt: "2020-09-17 09:32:20.489437",
            updatedAt: "2020-09-17 09:32:20.489437",
        },
    ];

    createComment(values: CommentsFormValuesInterface) {
        return new Promise<CommentModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._comments[0]);
                }
            }, 700);
        });
    }

    deleteComment(id: number) {
        return new Promise<CommentModel[]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._comments);
                }
            }, 700);
        });
    }

    getAllComments() {
        return new Promise<CommentModel[]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._comments);
                }
            }, 700);
        });
      }

    updateComment(id: number, content: string) {
        return new Promise<CommentModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._comments[0]);
                }
            }, 700);
        });
    }

    getPosts() {
        return new Promise<[PostModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._posts, 10]);
                }
            }, 700);
        });
    }

    getComments() {
        return new Promise<[CommentModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._comments, 10]);
                }
            }, 700);
        });
    }

    getTags() {
        return new Promise<[TagModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._tags, 10]);
                }
            }, 700);
        });
    }

    getAllPosts() {
        return new Promise<[PostModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._posts, 10]);
                }
            }, 700);
        });
    }

    getOwnPosts() {
        return new Promise<[PostModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._posts, 10]);
                }
            }, 700);
        });
    }

    getPostBySlug(slug: string) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    getOwnPostBySlug(slug: string) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    getTagBySlug(slug: string) {
        return new Promise<TagModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._tags[0]);
                }
            }, 700);
        });
    }

    createPost(values: PostFormValues) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    updatePost(postId: number, values: PostFormValues) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }

    managePost(postId: number, values: { status: PostStatus }) {
        return new Promise<PostModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._posts[0]);
                }
            }, 700);
        });
    }


    getUsers() {
        return new Promise<[UserModel[], number]>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve([this._users, 24]);
                }
            }, 700);
        });
    }

    updateUser(userId: number, values: UserFormValues) {
        return new Promise<UserModel>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this._users[0]);
                }
            }, 700);
        });
    }

    test() {
        console.log('testing...');
    }

}