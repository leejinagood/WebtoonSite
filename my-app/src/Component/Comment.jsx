import React, { useEffect, useState, useRef } from "react";
import styles from "./CommetCss.module.css";

const Comment = ({ webtoonName, episodeNumber }) => {
  const [comments, setComments] = useState([]);
  const [UserEmail, setUserEmail] = useState("");



  const commentInputRef = useRef(null); // useRef 훅을 사용하여 참조
  console.log("comnent EnName:" + webtoonName + "Ep" + episodeNumber);

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
        WebEnName: webtoonName,
        Ep: episodeNumber,
        UserEmail: UserEmail,
        content: commentContent, // 댓글 내용으로 수정
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 성공적으로 업로드되었을 때의 처리
        // 업로드가 성공했다는 메시지를 사용자에게 표시할 수 있습니다.
        console.log(webtoonName , episodeNumber , UserEmail , commentContent);
        // 새로운 코멘트 컨텐츠를 리스트에 추가
        setComments((prevComments) => [...prevComments, data]); // data를 comments에 추가
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

    setUserEmail(sessionStorage.getItem("userName"));

    fetch(`/api/commentlist?EnName=${webtoonName}&ep=${episodeNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const  comment  = data.comment;

        // API 응답으로 받아온 코멘트 목록을 comments 상태에 업데이트
        setComments(comment);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, [webtoonName, episodeNumber]);


  return (
    <div className={styles.CommentComponent}>
      <div className={styles.Comment}>
        <div className={styles.CommentList}>
          <ul>
            {comments && comments.length > 0 ? ( // Check if comments is not undefined
              comments.map((comment, index) => (
                <li key={index}>
                  <span className={styles.NameDay}>
                    {comment && comment.User_Name && comment.Comment_Date
                      ? `${comment.User_Name}/${comment.Comment_Date}`
                      : ''}
                  </span>
                  <br />
                  <span className={styles.Comment_Content}>
                    {comment && comment.Comment_Content}
                  </span>
                </li>
              ))
            ) : (
              <li>No comments yet.</li>
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