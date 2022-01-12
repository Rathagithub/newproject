import { fireEvent, render, screen } from '@testing-library/react';
import CommentsContainer from '../CommentsContainer';
import userEvent from '@testing-library/user-event';

it('renders Comments Container', () => {
 render(<CommentsContainer />)
 const poster = screen.getByRole('img');
 expect(poster).toHaveAttribute('src', 'images.png');
 expect(poster).toHaveAttribute('alt', 'poster');
});

it('renders Comments Container', () => {
 render(<CommentsContainer />)
 screen.getByTestId("comment_input");
});

it('renders Comments Container', () => {
 render(<CommentsContainer />)
 screen.getByTestId("save_comment")
});

describe("ClickPostButton", () => {
 it("click", () => {
  render(<CommentsContainer />)
  const commentInput = screen.getByTestId("comment_input");
  userEvent.type(commentInput, "comment 1");
  const button = screen.getByTestId("save_comment")
  fireEvent.click(button)
 })
})

describe("ClickCancelButton", () => {
 it("click", () => {
  render(<CommentsContainer />)
  const commentInput = screen.getByTestId("comment_input");
  userEvent.type(commentInput, "comment 1");
  const button = screen.getByTestId("clear_text")
  fireEvent.click(button)
 })
})
