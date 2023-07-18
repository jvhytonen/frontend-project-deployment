import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../store'
import { deleteAuthor } from '../../features/slices/authorSlice'
import AdminActionIcons from '../AdminActionIcons/AdminActionIcons'
import { Author } from '../../features/types/types'

function AuthorDetails({ id, name, description }: Author) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.items)

  const editAuthorHandler = () => {
    navigate(`/authors/edit/${id}`)
  }

  const deleteAuthorHandler = () => {
    dispatch(deleteAuthor(id))
  }

  return (
    <div
      key={id}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {user !== null && user.role === 'ADMIN' ? (
        <p className="underline cursor-pointer" onClick={deleteAuthorHandler}>
          Delete
        </p>
      ) : null}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default AuthorDetails
