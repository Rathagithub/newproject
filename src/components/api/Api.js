import axios from 'axios'

const getcommentsDb = async () => {
 try {
  const resp = await axios.get('/api/getcomments')
  const data = Object.values(resp.data)
  return data
 } catch (err) {
  return err
 }
}

const addCommentDb = async (comment) => {
 try {
  await axios.post('/api/save', comment)
  return comment
 } catch (err) {
  return err
 }
}

export { getcommentsDb, addCommentDb }