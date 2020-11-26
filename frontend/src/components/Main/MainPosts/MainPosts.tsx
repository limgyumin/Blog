import React from "react";
import useQuery from "../../../util/lib/hooks/useQuery";
import PostType from "../../../util/types/Post";
import MainFixedPost from "./MainFixedPost";
import MainPostItem from "./MainPostItem";
import MainPostItemLoading from "./MainPostItemLoading";
import "./MainPosts.scss";

interface MainPostsProps {
  fixedPost: PostType;
  posts: PostType[];
  loading: boolean;
}

const MainPosts = ({ fixedPost, posts, loading }: MainPostsProps) => {
  const query = useQuery();
  return (
    <>
      <div className="Main-Posts">
        <div className="Main-Posts-List">
          {loading ? (
            <>
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
            </>
          ) : (
            <>
              {fixedPost && query.get("tab") === null && (
                <MainFixedPost fixedPost={fixedPost} />
              )}
              {posts.map((post: PostType, idx: number) => (
                <MainPostItem key={idx} post={post} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPosts;
