import { observable, action } from 'mobx';

class PostStore {
  @observable post = '';
  @observable postId = '';

  constructor(initialData = {}) {
    this.post = initialData.post;
    this.postId = initialData.postId;
  }

  @action addToDo(post) {
    this.post = post;
  }

  @action setPostId(id) {
    this.postId = id;
  }

  __data() {
    return {
      post: this.post,
      postId: this.postId,
    };
  }
}

export default PostStore;