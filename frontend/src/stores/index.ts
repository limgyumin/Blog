import CategoryStore from "./Category";
import CommentStore from "./Comment";
import PostStore from "./Post";
import ReplyStore from "./Reply";
import UserStore from "./User";

const stores = {
  PostStore: new PostStore(),
  CommentStore: new CommentStore(),
  ReplyStore: new ReplyStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore(),
};

export default stores;
