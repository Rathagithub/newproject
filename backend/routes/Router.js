const express = require('express');
const router = express.Router();
const Storage = require('node-storage');
const store = new Storage('../storage');

router.get('/getcomments', (req, res) => {
 try {
  const comments = store.get('comments');
  res.status(200).json(comments)
 }
 catch (err) {
  return err
 }
});

router.post('/save', (req, res) => {
 try {
  const id = req.body.id
  const comment = req.body
  store.put(`comments.${id}`, comment)
  res.status(200).json(comment)
 }
 catch (err) {
  return err
 }
});

router.delete('/delete', (req, res) => {
 try {
  store.remove(`comments`,)
  res.status(200).json('success')
 }
 catch (err) {
  return err
 }
});

module.exports = router;