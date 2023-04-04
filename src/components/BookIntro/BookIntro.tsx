import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { BookIntroType } from '../../features/types/types'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import AdminActionIcons from '../AdminActionIcons/AdminActionIcons'
import { deleteBook } from '../../features/book/bookSlice'

function BookIntro({ ISBN, title, description, url }: BookIntroType) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const editBookHandler = () => {
    navigate(`/edit/${ISBN}`)
  }

  const deleteBookHandler = () => {
    dispatch(deleteBook(ISBN as number))
  }

  return (
    <div className="relative flex justify-center">
      {user.isAdmin ? (
        <div className="absolute w-1/6 top-0 right-0">
          <AdminActionIcons editItem={editBookHandler} deleteItem={deleteBookHandler} />
        </div>
      ) : null}
      <div className="flex flex-col rounded-lg bg-white shadow-lg md:max-w-xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={url}
          alt=""
        />
        <div className="flex flex-col justify-between p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800">{title}</h5>
          <p className="mb-4 text-base text-neutral-600">{description}</p>
          <div className="flex justify-around">
            <Link to={`${ISBN}`}>Read more</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookIntro
