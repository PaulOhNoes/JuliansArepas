import axios from "axios"

const baseUrl = 'http://localhost:3001/orders'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response, 'response')
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const terminate = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAll,
  create,
  update,
  terminate
}