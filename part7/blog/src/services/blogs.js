import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs' // replace with PROCESS.ENV in the future
let token = null

// create token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createBlog = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data;
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config);
}

export default { getAll, createBlog, update, setToken, deleteBlog }