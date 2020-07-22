export default class BlogService {

  data = [
    {
      id: 1,
      title: 'Production-Ready Microservices',
      content: 'Susan J. Fowler'
    },
    {
      id: 2,
      title: 'Release It!',
      content: 'Michael T. Nygard'
    }
  ];

  getPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error('Something bad happened'));
        } else {
          resolve(this.data);
        }
      }, 700);
    });
  }

  test() {
    console.log('testing...');
  }
}