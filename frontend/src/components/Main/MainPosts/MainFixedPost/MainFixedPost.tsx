import React from "react";
import moment from "moment";
import "./MainFixedPost.scss";
import chat from "../../../../assets/images/chat.svg";
import like from "../../../../assets/images/like.svg";
import PostType from "../../../../util/types/Post";

interface MainFixedPostProps {
  fixedPost: PostType;
}

const MainFixedPost = ({ fixedPost }: MainFixedPostProps) => {
  return (
    <>
      {fixedPost.idx && (
        <div className="Main-Fixed-Post">
          <div className="Main-Fixed-Post-Container">
            {/* {fixedPost.thumbnail && (
            <img src={fixedPost.thumbnail} alt={fixedPost.title} />
          )} */}
            <div className="Main-Fixed-Post-Container-Thumbnail">
              <span>Blog</span>
            </div>
            <div className="Main-Fixed-Post-Container-Area">
              <div className="Main-Fixed-Post-Container-Area-Content">
                <span className="Main-Fixed-Post-Container-Area-Content-Category">
                  <span>{fixedPost.category_name}</span> ·{" "}
                  {moment(fixedPost.created_at).format("YYYY년 MM월 DD일")}
                </span>
                <span className="Main-Fixed-Post-Container-Area-Content-Title">
                  {fixedPost.title}
                </span>
                <span className="Main-Fixed-Post-Container-Area-Content-Description">
                  {fixedPost.description}
                </span>
              </div>
              <div className="Main-Fixed-Post-Container-Area-Information">
                <div className="Main-Fixed-Post-Container-Area-Information-Profile">
                  <img
                    className="Main-Fixed-Post-Container-Area-Information-Profile-Avatar"
                    src={fixedPost.user_avatar}
                    alt={fixedPost.user_avatar}
                  />
                  <span className="Main-Fixed-Post-Container-Area-Information-Profile-Name">
                    <span>by </span>
                    {fixedPost.user_name}
                  </span>
                </div>
                <div className="Main-Fixed-Post-Container-Area-Information-Count">
                  <div className="Main-Fixed-Post-Container-Area-Information-Count-Comment">
                    <img src={chat} alt={chat} />
                    <span>{fixedPost.comment_count}</span>
                  </div>
                  <div className="Main-Fixed-Post-Container-Area-Information-Count-Like">
                    <img src={like} alt={like} />
                    <span>{fixedPost.like_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainFixedPost;
