import React from "react";
import { CategoryType } from "../../util/types/Category";
import PostType from "../../util/types/Post";
import "./Main.scss";
import MainCategories from "./MainCategories";
import MainPosts from "./MainPosts";
import MainPostNotFound from "./MainPosts/MainPostNotFound";

interface MainProps {
  fixedPost: PostType;
  posts: PostType[];
  categories: CategoryType[];
  totalPostCount: number;
  notFound: boolean;
  loading: boolean;
  postCount: number;
  postRef: (node?: Element | null | undefined) => void;
}

const Main = ({
  fixedPost,
  posts,
  categories,
  totalPostCount,
  notFound,
  loading,
  postCount,
  postRef,
}: MainProps) => {
  return (
    <>
      <div className="Main">
        <div className="Main-Container">
          {notFound ? (
            <MainPostNotFound />
          ) : (
            <MainPosts
              fixedPost={fixedPost}
              posts={posts}
              loading={loading}
              postCount={postCount}
              postRef={postRef}
            />
          )}
          <MainCategories
            categories={categories}
            totalPostCount={totalPostCount}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
