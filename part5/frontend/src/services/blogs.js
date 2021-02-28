import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(baseUrl+'/'+blog.id,{ ...blog,user: blog.user.id })
  return response.data
}

const deleteblog = async (blog) => {
  const response = await axios.delete(baseUrl+'/'+blog.id,config)
  return response.data
}
export default { getAll, create, setToken, update, deleteblog }
