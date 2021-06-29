import React from "react";
import Modal from "components/common/Modal";
import useComment from "hooks/comment/useComment";
import useFetchComments from "hooks/comment/useFetchComments";
import PostCommentDelete from "./PostCommentDelete";
import PostCommentItem from "./PostCommentItem";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./PostComment.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const PostComment = () => {
  const { commentCount, comments } = useFetchComments();
  const {
    content,
    commentLastEl,
    commentTextAreaEl,
    isMount,
    handleModalMount,
    handleChangeContent,
    handleKeyDownContent,
    handleClickDeleteComment,
    handleCreateComment,
    handleDeleteComment,
  } = useComment();

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <PostCommentDelete onDelete={handleDeleteComment} onCancel={handleModalMount} />
      </Modal>
      <div className={cx("post-comment")}>
        <div className={cx("post-comment-wrap")}>
          <p className={cx("post-comment-wrap-count")}>
            {commentCount} {commentCount > 1 ? "Comments" : "Comment"}
          </p>
          <div className={cx("post-comment-wrap-input")}>
            <textarea
              ref={commentTextAreaEl}
              value={content}
              onChange={(e) => handleChangeContent(e)}
              onKeyDown={(e) => handleKeyDownContent(e)}
              placeholder="Write a comment ..."
              className={cx("post-comment-wrap-input-box")}
            />
            <div className={cx("post-comment-wrap-input-container")}>
              <button
                className={cx("post-comment-wrap-input-container-button")}
                onClick={handleCreateComment}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className={cx("post-comment-list")} ref={commentLastEl}>
          {comments.map((comment) => (
            <PostCommentItem
              key={comment.idx}
              comment={comment}
              onClick={handleClickDeleteComment}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostComment;
