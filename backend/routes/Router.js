const express = require('express');
const router = express.Router();
const Storage = require('node-storage');
const store = new Storage('../storage');

router.get('/getcomments', async (req, res) => {
 try {
  const comments = await store.get('comments');
  res.status(200).json(comments)
 }
 catch (err) {
  return err
 }
});

router.post('/save', async (req, res) => {
 try {
  const id = req.body.id
  const comment = req.body
  await store.put(`comments.${id}`, comment)
  res.status(200).json(comment)
 }
 catch (err) {
  return err
 }
});

router.delete('/delete-all', async (req, res) => {
 try {
  await store.remove(`comments`,)
  res.status(200).json('success')
 }
 catch (err) {
  return err
 }
});

module.exports = router;