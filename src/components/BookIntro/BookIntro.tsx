import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { BookIntroType } from '../../features/types/types'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import AdminActionIcons from '../AdminActionIcons/AdminActionIcons'
import { deleteBook } from '../../features/book/bookSlice'

function BookIntro({ ISBN, title, authors, url }: BookIntroType) {
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
    <div className="flex justify-center">
      <div className="flex flex-col relative rounded-lg bg-white shadow-lg lg:max-w-2xl lg:flex-row">
        {user.isAdmin ? (
          <div className="absolute w-1/3 top-3 left-6">
            <AdminActionIcons editItem={editBookHandler} deleteItem={deleteBookHandler} />
          </div>
        ) : null}
        <img
          className="h-96 rounded-t-lg object-cover lg:h-auto lg:w-48 lg:rounded-none lg:rounded-l-lg"
          src={url}
          alt=""
        />
        <div className="flex flex-col max-w-full justify-between p-6">
          <div>
            <h5 className="mb-2 text-xl font-medium text-neutral-800">{title}</h5>
            <p className="mb-4 text-base text-neutral-600 leading-none">{authors}</p>
          </div>
          <div className="flex justify-start items-end">
            <Link to={`${ISBN}`}>
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none lg:px-3 lg:py-2">
                Read more
              </button>
            </Link>
            <div className="flex flex-col lg:hidden">
              <Link to={`/edit/${ISBN}`}>
                <button
                  onClick={editBookHandler}
                  type="button"
                  className="text-white w-20 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none lg:px-3 lg:py-2">
                  Edit
                </button>
              </Link>
              <button
                onClick={deleteBookHandler}
                type="button"
                className="text-white w-20 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none lg:px-3 lg:py-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookIntro
