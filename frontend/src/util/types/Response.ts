import { CategoryType } from "./Category";
import PostType from "./Post";
import UserType from "./User";

export type Response = {
  status: number;
  message: string;
};

export interface PostsResponse extends Response {
  data: {
    post_count: number;
    posts: PostType[];
  };
}

export interface PostFixedResponse extends Response {
  data: {
    post: PostType;
  };
}

export interface CategoriesResponse extends Response {
  data: {
    total: number;
    categories: CategoryType[];
  };
}

export interface GetMyProfileResponse extends Response {
  data: {
    user: UserType;
  };
}

export interface LoginResponse extends Response {
  data: {
    access_token: string;
  };
}
