import { apiErrorHandler } from './errors'
import { DeleteRequest, PostRequest } from '../types/types'

export const deleteItem = async (req: DeleteRequest) => {
  const response = await fetch(req.url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
        'Authorization': `Bearer ${req.token}`
    }
  })
  await apiErrorHandler(response)
  const responseData = await response.json()
  return responseData
}

export const addItem = async (req: PostRequest) => {
  const response = await fetch(req.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
        'Authorization': `Bearer ${req.token}`
    },
    body: JSON.stringify(req.body)
  })
  await apiErrorHandler(response)
  const responseData = await response.json()
  return responseData
}

export const updateItem = async (req: PostRequest) => {
  const response = await fetch(req.url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
        'Authorization': `Bearer ${req.token}`
    },
    body: JSON.stringify(req.body)
  })
  await apiErrorHandler(response)
  const responseData = await response.json()
  return responseData
}
