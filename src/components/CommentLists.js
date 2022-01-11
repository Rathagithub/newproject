import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const CommentLists = ({ comment, commentsList, addReply, edit, deleteComment, replyComments }) => {
 const [reply, setReply] = useState({ parentId: null, text: '' })

 const getReplies = (id) => {
  return (commentsList || []).filter(c => c.parentId === id)
   .sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
   );
 }

 const addMargin = comment.parentId ? 'ml-5' : ''

 return (
  <div className="flex row comment-container m-5">
   <div className={`${addMargin}`}>
    <h4 className="h-0">{comment.text}</h4>
    {!reply.parentId && (
     <span className="flex row-reverse mt-25">
      <span
       className="comment-but"
       onClick={() => deleteComment(comment.id)}
      >
       <a href="#">Delete</a>
      </span>
      <span
       className="comment-but"
       onClick={() => edit({ id: comment.id, text: comment.text })}
      >
       <a href="#">Edit</a>
      </span>
      <span
       className="comment-but"
       onClick={() => setReply({ parentId: comment.id, text: '' })}
      >
       <a href="#">Reply</a>
      </span>
     </span>
    )}
    {replyComments.map(reply => (
     <CommentLists
      key={comment.id}
      comment={reply}
      edit={edit}
      addReply={addReply}
      deleteComment={deleteComment}
      replyComments={getReplies(reply.id)}
     />
    ))}
    {reply.parentId && (
     <div className="flex row">
      <div className="w-80">
       <input
        value={reply.text}
        className="inputBox"
        onChange={(e) => setReply({ ...reply, text: e.target.value })}
       />
      </div>
      <div className="flex row-reverse ml-10">
       {reply.text && (
        <button onClick={() => setReply({ parentId: null, text: '' })}>Cancel</button>
       )}

       <button
        className="post-but"
        disabled={!reply.text}
        onClick={() => {
         addReply(reply)
         setReply({ parentId: null, text: '' })
        }}
       >
        Post
       </button>
      </div>
     </div>
    )}
   </div>
  </div>
 )
};

export default CommentLists;
