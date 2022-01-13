import React from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { getcommentsDb, addCommentDb } from '../Api';

jest.mock('axios');

const BASE_URL = "/api/getcomments"
const comment = {
 "id": uuidv4(),
 "text": "post",
 "parentId": null,
 "created": 1641951478221
}

const users = {
 "01a42972-c61c-4516-812c-15d66f6f2123": {
  "id": "01a42972-c61c-4516-812c-15d66f6f2123",
  "text": "post",
  "parentId": null,
  "created": 1641951478221
 }
}

describe("fetchComments", () => {
 it("should return users list", async () => {
  axios.get.mockResolvedValueOnce({ data: [users] });
  const result = await getcommentsDb()
  expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}`);
  expect(result).toEqual([users]);
 });
})

describe("postComments", () => {
 it("should post comment", async () => {
  axios.post.mockResolvedValueOnce(comment);
  const result = await addCommentDb(comment)
  expect(result).toEqual(comment);
 });
})
