import React from "react";
import { ReactComponent as Like } from "../../../assets/images/like.svg";
import { FaTrash, FaPen } from "react-icons/fa";
import getTimeCount from "../../../util/lib/getTimeCount";
import PostLike from "../PostLike";
import "./PostHeader.scss";

interface PostHeaderProps {
  title: string;
  writer: string;
  categoryName: string;
  createdAt: Date;
  thumbnail: string;
  handlePostLikeCallback: () => Promise<void>;
  showModalCallback: () => void;
  likeCount: number;
  liked: boolean;
  admin: boolean;
}

const PostHeader = ({
  title,
  writer,
  categoryName,
  createdAt,
  thumbnail,
  handlePostLikeCallback,
  showModalCallback,
  likeCount,
  liked,
  admin,
}: PostHeaderProps) => {
  return (
    <>
      <div className="Post-Header">
        <div className="Post-Header-Container">
          <h1 className="Post-Header-Container-Title">{title}</h1>
          <div className="Post-Header-Container-Category">
            <div className="Post-Header-Container-Category-Wrapper">
              <div className="Post-Header-Container-Category-Wrapper-Name">
                {categoryName}
              </div>
              <p className="Post-Header-Container-Category-Wrapper-Info">
                <span>{writer}</span>
                {" · "}
                {getTimeCount(createdAt)}
              </p>
            </div>
            <div
              className={
                liked
                  ? "Post-Header-Container-Category-Like-Active Post-Header-Container-Category-Like"
                  : "Post-Header-Container-Category-Like"
              }
              onClick={handlePostLikeCallback}
            >
              <Like
                className={
                  liked
                    ? "Post-Header-Container-Category-Like-Button-Active Post-Header-Container-Category-Like-Button"
                    : "Post-Header-Container-Category-Like-Button"
                }
              />
              <span
                className={
                  liked
                    ? "Post-Header-Container-Category-Like-Count-Active Post-Header-Container-Category-Like-Count"
                    : "Post-Header-Container-Category-Like-Count"
                }
              >
                {likeCount}
              </span>
            </div>
            {admin && (
              <div className="Post-Header-Container-Category-Control">
                <FaPen onClick={() => {}} />
                <FaTrash onClick={() => showModalCallback()} />
              </div>
            )}
          </div>
        </div>
        <div className="Post-Header-Like">
          <PostLike
            handlePostLikeCallback={handlePostLikeCallback}
            likeCount={likeCount}
            liked={liked}
          />
        </div>
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="Post-Header-Thumbnail"
          />
        )}
      </div>
    </>
  );
};

export default PostHeader;
