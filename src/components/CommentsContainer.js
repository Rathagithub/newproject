import React, { useState, useEffect } from "react";
import CommentLists from "./CommentLists";
import { v4 as uuidv4 } from 'uuid'
import poster from './img/images.png'
import moment from "moment";
import { addCommentDb, getcommentsDb } from './api/Api'

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setText] = useState('');

  const commentsList = comments.length ? comments.filter((c) => c.parentId === null) : []

  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.created).getTime() - new Date(b.created).getTime()
      );

  const addComment = async () => {
    const comment = {
      id: uuidv4(),
      text: commentText,
      parentId: null,
      created: moment().utc().valueOf(),
    }
    const resp = await addCommentDb(comment)
    if (resp) {
      setComments([resp, ...comments]);
      setText('');
    }
  };

  const addReply = async (reply) => {
    const comment = {
      id: uuidv4(),
      text: reply.text,
      parentId: reply.parentId,
      created: moment().utc().valueOf(),
    }
    const resp = await addCommentDb(comment)
    if (resp) setComments([resp, ...comments]);
  };

  const getcomments = async () => {
    const data = await getcommentsDb()
    if (data) setComments(data);
  }

  useEffect(() => {
    getcomments()
  }, []);

  return (
    <div className="container">
      <div className="poster-container">
        <img src={poster} alt="poster" className="poster" />
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
            data-testid='comment_input'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex row-reverse ml-10">
          {commentText && (
            <button data-testid="clear_text" onClick={() => setText('')}>Cancel</button>
          )}

          <button
            disabled={!commentText}
            onClick={addComment}
            className="post-but"
            data-testid="save_comment"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsContainer;
