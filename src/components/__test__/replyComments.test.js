import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CommentLists from '../CommentLists';

describe("Compoenet", () => {
 it('rendersCommentListComponent', () => {
  const data = [{
   'created': 1641951478221,
   'id': "01a42972-c61c-4516-812c-15d66f6f2123",
   'parentId': null,
   'text': "post"
  }]
  render(<CommentLists comment={data} />)
 });
})

it("should update state on click", async () => {

 const data = [{
  'created': 1641951478221,
  'id': "01a42972-c61c-4516-812c-15d66f6f2123",
  'parentId': null,
  'text': "post"
 }]
 render(<CommentLists comment={data} />);

 const replyButton = screen.getByTestId("click_reply")
 fireEvent.click(replyButton)
});