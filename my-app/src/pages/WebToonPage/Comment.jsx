import React, { useEffect, useState } from "react";
import CommentCss from "./styles/CommetCss.css";

const Comment = ({ webtoonName, episodeNumber }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comment?WebtoonName=${webtoonName}&EpisodeNumber=${episodeNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const { comment } = data;
        setComments(comment);
        console.log(webtoonName,episodeNumber);
        console.log(comment);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonName, episodeNumber]);

  return (
    <div className="CommentComponent">
      <div className="Comment">
        <div className="CommentList">
          <ul>
            {comments.map((comment, index) => (
              <li key={index}><span className="NameDay">{comment.User_Name}/{comment.Comment_Date}</span><br></br><span className="Comment_Content">{comment.Comment_Content}</span></li>
            ))}
          </ul>
        </div>
        <div className="CommentBox">
          <textarea></textarea>
          <button className="CommentUpload" type="submit">작성</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
