import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  if (newObject.title.length === 0 || newObject.author.length === 0
    || newObject.url.length === 0) {
    throw new Error("missing info")
  }

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const response = await axios.put(baseUrl + '/' + id, newObject)
  return response.data
}

export default { getAll, create, update, setToken }