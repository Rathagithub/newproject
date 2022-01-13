const request = require("supertest");
const app = require("./index");

describe("Fetch comments", () => {
 test('The Get comments', async () => {
  expect.assertions(1);
  const response = await request(app).get('/api/getcomments');
  expect(response.statusCode).toBe(200);
 });
});

describe("Post comments", () => {
 test('The Post comments', async () => {
  expect.assertions(1);
  const response = await request(app).post('/api/save')
   .send({
    "id": "123456yhvedrf",
    "text": "post",
    "parentId": null,
    "created": 1641951478221
   });
  expect(response.statusCode).toBe(200);
 });
});

describe("Delete all comments", () => {
 test('Delete comments', async () => {
  expect.assertions(1);
  const response = await request(app).delete('/api/delete-all')
  expect(response.statusCode).toBe(200);
 });
});