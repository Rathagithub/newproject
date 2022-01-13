import axios from 'axios'

const getcommentsDb = async () => {
 const resp = await axios.get('/api/getcomments')
 const data = Object.values(resp.data)
 return data
}

const addCommentDb = async (comment) => {
 await axios.post('/api/save', comment)
 return comment
}

export { getcommentsDb, addCommentDb }