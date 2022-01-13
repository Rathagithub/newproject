import React, { useState, useEffect } from "react";
import CommentLists from "./CommentLists";
import { v4 as uuidv4 } from 'uuid'
import poster from './img/poster.jpeg'
import moment from "moment";
import { addCommentDb, getcommentsDb } from './api/Api'

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setText] = useState('');

  const commentsList = comments.length ? comments.filter((c) => c.parentId === null) : []

  const getReplies = (commentId) => comments.filter((comment) => comment.parentId === commentId)

  const addComment = async () => {
    const comment = {
      id: uuidv4(),
      text: commentText,
      parentId: null,
      created: moment().utc().valueOf(),
    }
    try {
      const resp = await addCommentDb(comment)
      setComments([...comments, resp]);
      setText('');
    } catch (err) {
      console.log('err', err)
      window.alert('Comment post failed')
    }
  };

  const addReply = async (reply) => {
    const comment = {
      id: uuidv4(),
      text: reply.text,
      parentId: reply.parentId,
      created: moment().utc().valueOf(),
    }
    try {
      const resp = await addCommentDb(comment)
      if (resp) setComments([...comments, resp]);
    } catch (err) {
      console.log('err', err)
      window.alert('Comment reply failed')
    }
  };

  const getcomments = async () => {
    try {
      const data = await getcommentsDb()
      setComments(data);
    } catch (err) {
      console.log('err', err)
      window.alert('Fetch all Comments failed')
    }
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
