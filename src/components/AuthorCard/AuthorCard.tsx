import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Author } from '../../features/types/types'
import Button, { HandleClick } from '../Button/Button'
import { RootState, AppDispatch } from '../../store'
import { deleteAuthor } from '../../features/author/authorSlice'

function AuthorCard({ id, name, description }: Author) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const deleteAuthorHandler: HandleClick = () => {
    dispatch(deleteAuthor(id))
  }
  const updateAuthorHandler: HandleClick = () => {
    // This will be implemented once there is form to use for this purpose.
    console.log('Editing author here')
  }
  return (
    <div className="border border-black bg-green-300 h-[100px] w-2/5">
      <h2>{name}</h2>
      <p>{description}</p>
      {user !== null && user.userType === 'admin' ? (
        <Button label="Edit" type="edit" handleClick={updateAuthorHandler} />
      ) : null}
      {user !== null && user.userType === 'admin' ? (
        <Button label="Delete" type="delete" handleClick={deleteAuthorHandler} />
      ) : null}
    </div>
  )
}

export default AuthorCard
