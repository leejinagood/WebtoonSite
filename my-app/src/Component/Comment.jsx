
import React, { useEffect, useState, useRef } from "react";
import styles from "./CommetCss.module.css";
import {  loadCommentList } from "../pages/api/commentInsert";
import { parseCookies } from 'nookies'; // nookies 라이브러리 import
import jwt_decode from 'jwt-decode'; // JWT 토큰을 디코딩하기 위한 라이브러리

const Comment = ({ webtoonName, episodeNumber }) => {
  const [comments, setComments] = useState([]);

  const commentInputRef = useRef(null);

  console.log("comnent EnName:" + webtoonName + "Ep" + episodeNumber);
  let token;
  const submitComment = () => {
    const commentContent = commentInputRef.current.value;
  
    const cookies = parseCookies();
    const token = cookies.token; // 쿠키에서 토큰 값을 'token' 변수에 할당합니다.
  
    if (token) {
      const decodedToken = jwt_decode(token);
  
      fetch('http://3.39.187.19:4000//api/comment_insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          WebEnName: webtoonName,
          Ep: episodeNumber,
          userID: decodedToken.UserID,
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
    } else {
      window.alert("로그인필요");
    }
  };



  const loadComments = async () => {
    try {
      const commentList = await loadCommentList(webtoonName, episodeNumber);
      setComments(commentList);
      console.log(commentList);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  


  useEffect(() => {
    if (webtoonName && episodeNumber) {
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
