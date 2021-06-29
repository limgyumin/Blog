import React from "react";
import MarkDown from "components/common/MarkDown";
import Modal from "components/common/Modal";
import ReactHelmet from "components/common/ReactHelmet";
import useFetchPost from "hooks/post/useFetchPost";
import usePost from "hooks/post/usePost";
import useModal from "hooks/common/useModal";
import removeElTag from "lib/removeElTag";
import PostDelete from "./PostDelete";
import PostHeader from "./PostHeader";
import PostList from "./PostList";
import PostLoading from "./PostLoading";
import PostNotFound from "./PostNotFound";
import PostProfile from "./PostProfile";
import PostBottomBar from "./PostBottomBar";
import PostComment from "./PostComment";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Post.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Post = () => {
  const { admin, loading, notFound, post, otherPosts, postTopEl, handleScrollTop } = useFetchPost();
  const { isMount, handleModalMount } = useModal();
  const { handleClickUpdatePost, handleConfirmDeletePost } = usePost();

  const {
    idx,
    title,
    description,
    content,
    thumbnail,
    user,
    category_name,
    created_at,
    is_temp,
  } = post;

  return (
    <React.Fragment>
      {idx && (
        <ReactHelmet
          title={title}
          description={removeElTag(description)}
          url={`https://nonamed.blog/post/${idx}`}
          image={thumbnail}
        />
      )}
      <Modal isMount={isMount}>
        <PostDelete onDelete={handleConfirmDeletePost} onCancel={handleModalMount} />
      </Modal>
      <div className={cx("post")} ref={postTopEl}>
        {idx && <PostBottomBar onClick={handleScrollTop} />}
        {notFound ? (
          <PostNotFound />
        ) : (
          <div className={cx("post-wrap")}>
            {loading ? (
              <PostLoading />
            ) : (
              idx && (
                <React.Fragment>
                  <PostHeader
                    title={title}
                    writer={user.name}
                    categoryName={category_name}
                    createdAt={created_at}
                    thumbnail={thumbnail}
                    onUpdate={handleClickUpdatePost}
                    onDelete={handleModalMount}
                    admin={admin}
                  />
                  {content && <MarkDown className={cx("post-content")}>{content}</MarkDown>}
                  <PostProfile user={user} />
                  <PostList otherPosts={otherPosts} />
                  {!is_temp && <PostComment />}
                </React.Fragment>
              )
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Post;
