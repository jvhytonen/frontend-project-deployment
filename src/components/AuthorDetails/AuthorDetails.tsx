import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Button, { HandleClick } from '../Button/Button'
import { RootState, AppDispatch } from '../../store'
import { deleteAuthor } from '../../features/author/authorSlice'

function AuthorDetails() {
  const user = useSelector((state: RootState) => state.user)
  const author = useSelector((state: RootState) => state.author)
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const filteredAuthor = author.items?.filter((item) => Number(params.id) === item.id)
  const authorItem = filteredAuthor ? filteredAuthor[0] : null

  const deleteAuthorHandler: HandleClick = () => {
    if (authorItem !== null) {
      dispatch(deleteAuthor(authorItem.id))
    }
  }
  const updateAuthorHandler: HandleClick = () => {
    // This will be implemented once there is form to use for this purpose.
    console.log('Editing author here')
  }
  return (
    <div className="border border-black bg-green-300 h-[100px] w-2/5">
      {authorItem !== null ? (
        <>
          <h2>{authorItem.name}</h2>
          <p>{authorItem.description}</p>
          {user !== null && user.userType === 'admin' ? (
            <Button label="Edit" type="edit" handleClick={updateAuthorHandler} />
          ) : null}
          {user !== null && user.userType === 'admin' ? (
            <Button label="Delete" type="delete" handleClick={deleteAuthorHandler} />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default AuthorDetails
