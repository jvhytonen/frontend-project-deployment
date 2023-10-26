import {
  DeleteRequest,
  GetRequestWithAuth,
  GetRequestWithoutAuth,
  PostRequest
} from '../types/requestTypes'
import { apiErrorHandler } from './errors'

export const getItemNoAuth = async (req: GetRequestWithoutAuth) => {
  const response = await fetch(req.url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await apiErrorHandler(response)
  const responseData = await response.json()
  return responseData
}

export const getItemWithAuth = async (req: GetRequestWithAuth) => {
  const response = await fetch(req.url, {
    method: 'GET',
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

export const deleteItem = async (req: DeleteRequest) => {
  const response = await fetch(req.url + 'jv', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
        'Authorization': `Bearer ${req.token}`
    }
  })
  if (!response.ok) {
    // If the response status code is not in the 2xx range, reject the promise.
    throw new Error(`Failed to delete item: ${response.status} - ${response.statusText}`)
  }
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
  // await apiErrorHandler(response)
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
