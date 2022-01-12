import axios from 'axios'

const getcommentsDb = async () => {
 try {
  const resp = await axios.get('/api/getcomments')
  const data = Object.values(resp.data)
  return data
 } catch (err) {
  console.log("fetch commets failed", err)
 }
}

const addCommentDb = async (comment) => {
 try {
  await axios.post('/api/save', comment)
  return comment
 } catch (err) {
  console.log("post commet failed", err)
 }
}

export { getcommentsDb, addCommentDb }