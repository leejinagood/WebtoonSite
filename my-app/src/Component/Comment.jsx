// CommetCss.module.css
// 해당 파일은 스타일 시트로 Comment 컴포넌트에서 사용되는 스타일이 정의된 파일입니다.
// 필요한 스타일 시트를 작성하셔서 사용하시면 됩니다.

// Comment.js
import React, { useEffect, useState, useRef } from "react";
import styles from "./CommetCss.module.css";

const Comment = ({ webtoonName, episodeNumber }) => {
  const [comments, setComments] = useState([]);
  const [UserEmail, setUserEmail] = useState("");

  const commentInputRef = useRef(null);

  console.log("comnent EnName:" + webtoonName + "Ep" + episodeNumber);

  const submitComment = () => {
    const commentContent = commentInputRef.current.value;

    fetch('/api/comment_insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        WebEnName: webtoonName,
        Ep: episodeNumber,
        UserEmail: UserEmail,
        content: commentContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments((prevComments) => [...prevComments, data]);
        loadComments();
      })
      .catch((error) => {
        console.error("Error uploading comment:", error);
      });
  };

  const loadComments = () => {
    fetch(`/api/commentlist?EnName=${webtoonName}&ep=${episodeNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const comment = data.comment;
        setComments(comment);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  };

  useEffect(() => {
    if (webtoonName && episodeNumber) {

    setUserEmail(sessionStorage.getItem("userName"));
    loadComments();
    }
  }, [webtoonName, episodeNumber]);

  return (
    <div className={styles.CommentComponent}>
      <div className={styles.Comment}>
        <div className={styles.CommentList}>
          <ul>
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index}>
                  <span className={styles.NameDay}>
                    {comment && comment.userName && comment.commentDate
                      ? `${comment.userName}/${comment.commentDate}`
                      : ''}
                  </span>
                  <br />
                  <span className={styles.commentContent}>
                    {comment && comment.commentContent}
                  </span>
                </li>
              ))
            ) : (
              <li>댓글이 없습니다.</li>
            )}
          </ul>
        </div>
        <div className={styles.CommentBox}>
          <textarea ref={commentInputRef} defaultValue=""></textarea>
          <button className={styles.CommentUpload} type="submit" onClick={submitComment}>
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
