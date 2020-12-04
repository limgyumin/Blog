import React from "react";
import CommentType from "../../../../util/types/Comment";
import "./PostCommentItem.scss";
import UserType from "../../../../util/types/User";
import getTimeCount from "../../../../util/lib/getTimeCount";
import PostReplyContainer from "../../../../containers/Post/PostReplyContainer";

interface PostCommentItemProps {
  user: UserType;
  login: boolean;
  comment: CommentType;
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleCommentCountCallback: () => Promise<void>;
  handleModifyCommentCallback: () => void;
  handleModifyCancelCallback: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  deleteClickListener: (idx: number) => void;
}

const PostCommentItem = ({
  user,
  login,
  comment,
  enable,
  setEnable,
  content,
  setContent,
  handleCommentCountCallback,
  handleModifyCommentCallback,
  handleModifyCancelCallback,
  keyDownListener,
  deleteClickListener,
}: PostCommentItemProps) => {
  return (
    <>
      <div className="Post-Comment-Item">
        <div className="Post-Comment-Item-Wrapper">
          <div className="Post-Comment-Item-Wrapper-Info">
            <img src={comment.user.avatar} alt={comment.user.avatar} />
            <div className="Post-Comment-Item-Wrapper-Info-Container">
              <h3>{comment.user.name}</h3>
              <p>{getTimeCount(comment.created_at)}</p>
            </div>
          </div>
          {login && comment.user.idx === user.idx && (
            <>
              {!enable && (
                <div className="Post-Comment-Item-Wrapper-Control">
                  <p
                    className="Post-Comment-Item-Wrapper-Control-Edit"
                    onClick={() => setEnable(true)}
                  >
                    수정
                  </p>
                  <p
                    className="Post-Comment-Item-Wrapper-Control-Delete"
                    onClick={() => deleteClickListener(comment.idx)}
                  >
                    삭제
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {enable ? (
          <div className="Post-Comment-Item-Input">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => keyDownListener(e)}
              placeholder="댓글을 작성해주세요."
              className="Post-Comment-Item-Input-Box"
            />
            <div className="Post-Comment-Item-Input-Wrapper">
              <button
                className="Post-Comment-Item-Input-Wrapper-Button"
                onClick={() => handleModifyCommentCallback()}
              >
                수정하기
              </button>
              <button
                className="Post-Comment-Item-Input-Wrapper-Cancel"
                onClick={() => handleModifyCancelCallback()}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p>{comment.content}</p>
        )}
        <PostReplyContainer
          commentIdx={comment.idx}
          handleCommentCountCallback={handleCommentCountCallback}
        />
      </div>
    </>
  );
};

export default PostCommentItem;
