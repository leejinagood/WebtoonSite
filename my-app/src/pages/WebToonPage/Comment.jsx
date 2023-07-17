import React, { useEffect, useState, useRef } from "react";
import CommentCss from "./styles/CommetCss.css";

const Comment = ({ webtoonName, episodeNumber }) => {
  const [comments, setComments] = useState([]);

  const commentInputRef = useRef(null); // useRef 훅을 사용하여 참조

  const submitComment = () => {
    const commentContent = commentInputRef.current.value; // 참조한 요소의 value 가져옴
    console.log(commentContent);
    // 서버로 데이터 전송
    fetch('/api/comment_insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CommentContent: commentContent,
        WebtoonName: webtoonName,
        EpisodeNumber: episodeNumber,
      }),
    })
      .then((response) => response.json())
.then((data) => {
  console.log(data); // 성공적으로 업로드되었을 때의 처리
  // 업로드가 성공했다는 메시지를 사용자에게 표시할 수 있습니다.

  // 새로운 코멘트 컨텐츠를 리스트에 추가
  setComments((prevComments) => [...prevComments, { Comment_Content: commentContent }]);
})
  };

  useEffect(() => {
    fetch(`/api/comment?WebtoonName=${webtoonName}&EpisodeNumber=${episodeNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const { comment } = data;
        setComments(comment);
        console.log(webtoonName, episodeNumber);
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
  <li key={index}>
    <span className="NameDay">
      {comment && comment.User_Name && comment.Comment_Date ? `${comment.User_Name}/${comment.Comment_Date}` : ''}
    </span>
    <br />
    <span className="Comment_Content">{comment && comment.Comment_Content}</span>
  </li>
))}
          </ul>
        </div>
        <div className="CommentBox">
        <textarea ref={commentInputRef} defaultValue=""></textarea>
          <button className="CommentUpload" type="submit" onClick={submitComment}>
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
