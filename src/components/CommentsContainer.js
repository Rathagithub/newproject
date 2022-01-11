import React, { useState, useEffect } from "react";
import CommentLists from "./CommentLists";
import { v4 as uuidv4 } from 'uuid'
import poster from './img/images.png'
import moment from "moment";
import axios from 'axios'


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
    const comment = {
      id: uuidv4(),
      text: commentText,
      parentId: null,
      created: moment().utc().valueOf(),
    }
    try {
      axios.post('/api/save', comment).then(() => {
        setComments([comment, ...comments]);
        setText('');
      });
    } catch (err) {
      console.log("Post comment failed", err)
    }
  };

  const addReply = (reply) => {
    const comment = {
      id: uuidv4(),
      text: reply.text,
      parentId: reply.parentId,
      created: moment().utc().valueOf(),
    }
    try {
      axios.post('/api/save', comment).then(() => {
        setComments([comment, ...comments]);
      });
    } catch (err) {
      console.log('Reply failed', err)
    }
  };

  useEffect(() => {
    axios.get('/api/getcomments').then(resp => {
      const data = Object.values(resp.data)
      setComments(data);
    });
  }, []);

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
            addReply={addReply}
            commentsList={comments}
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
