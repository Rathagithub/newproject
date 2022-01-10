import React, { useState } from 'react';
import CommentForm from './CommentForm'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid'

const CommentsContainer = () => {

 const [commentsList, setCommentsList] = useState<any>([]);
 const [activeComment, setActiveComment] = useState(null);


 const addComment = (text: string, parentId: string) => {
  const comment = [{
   userId: "1",
   id: uuidv4(),
   comment: text,
   name: "Tester",
   createdAt: moment().utc(),
   parentId: parentId ? parentId : null,
  }]
  setCommentsList([comment, ...commentsList]);
  setActiveComment(null);
 };

 return (
  <div className='w-100'>
   <CommentForm submitLabel="Write" handleSubmit={addComment} />
  </div>
 );
}

export default CommentsContainer;
