import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiErrorHandler } from './errors'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { DeleteRequest } from '../types/types'

export const deleteItem = async (req: DeleteRequest) => {
  console.log(req.token)
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
