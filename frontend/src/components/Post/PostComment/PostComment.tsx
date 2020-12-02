import React from "react";
import CommentType from "../../../util/types/Comment";
import "./PostComment.scss";
import PostCommentItem from "./PostCommentItem";

interface PostCommentProps {
  comments: CommentType[];
  commentCount: number;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCreateCommentCallback: () => Promise<void>;
  keyPressListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const PostComment = ({
  comments,
  commentCount,
  comment,
  setComment,
  handleCreateCommentCallback,
  keyPressListener,
}: PostCommentProps) => {
  return (
    <>
      <div className="Post-Comment">
        <div className="Post-Comment-Container">
          <p className="Post-Comment-Container-Count">
            {commentCount}개의 댓글
          </p>
          <div className="Post-Comment-Container-Input">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => keyPressListener(e)}
              placeholder="댓글을 작성해주세요."
              className="Post-Comment-Container-Input-Box"
            />
            <div className="Post-Comment-Container-Input-Wrapper">
              <button
                className="Post-Comment-Container-Input-Wrapper-Button"
                onClick={() => handleCreateCommentCallback()}
              >
                작성하기
              </button>
            </div>
          </div>
        </div>
        <div className="Post-Comment-List">
          {comments.map((comment, idx) => (
            <PostCommentItem key={idx} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostComment;
