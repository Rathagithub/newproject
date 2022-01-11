import React, { useState, useEffect } from "react";
import CommentLists from "./CommentLists";
import { v4 as uuidv4 } from 'uuid'
import poster from './img/images.png'
import moment from "moment";


const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setText] = useState('');

  const commentsList = comments.filter((c) => c.parentId === null);
  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.created).getTime() - new Date(b.created).getTime()
      );

  const addComment = () => {
    setComments([{
      id: uuidv4(),
      parentId: null,
      text: commentText,
      created: moment().utc().valueOf(),
    }, ...comments]);
    setText('');
  };

  const addReply = (reply) => {
    console.log('reply', reply)
    setComments([{
      id: uuidv4(),
      text: reply.text,
      parentId: reply.parentId,
      created: moment().utc().valueOf(),
    }, ...comments]);
  };

  const updateComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, body: commentText };
      }
      return comment;
    });
    setComments(updatedComments);
    setText('');
  };

  const deleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  }

  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, []);

  return (
    <div className="container">
      <div className="poster-container">
        <img src={poster} alt="" className="poster" />
      </div>

      <div className="mt-20">
        {commentsList.map(comment =>
          <CommentLists
            key={comment.id}
            comment={comment}
            edit={updateComment}
            addReply={addReply}
            commentsList={comments}
            deleteComment={deleteComment}
            replyComments={getReplies(comment.id)}
          />
        )}
      </div>

      <div className="flex row mt-40">
        <div className="w-80">
          <input
            value={commentText}
            className="inputBox"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex row-reverse ml-10">
          {commentText && (
            <button onClick={() => setText('')}>Cancel</button>
          )}

          <button
            disabled={!commentText}
            onClick={addComment}
            className="post-but">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsContainer;
