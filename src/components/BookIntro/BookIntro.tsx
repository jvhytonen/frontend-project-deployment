import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { BookIntroType } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import { useSelector } from 'react-redux'
import { deleteBook } from '../../features/book/bookSlice'
//import { deleteBook } from '../../features/book/bookSlice'

function BookIntro({ isbn, title, id, author, description, imageUrl }: BookIntroType) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const editBookHandler = () => {
    navigate(`/edit/${isbn}`)
  }

  const deleteBookHandler = () => {
    if (id) {
      dispatch(deleteBook(id))
    }
  }

  return (
    <div className="my-0 ml-8 mr-auto py-2 sm:py-8 md:py-2 rounded-lg shadow-lg w-2/3 shadow-gray-200 bg-white">
      {user.items !== null && user.items.role === 'ADMIN' ? (
        <p className="underline cursor-pointer" onClick={deleteBookHandler}>
          Delete
        </p>
      ) : null}
      <div>
        <img
          src="https://tubular-unicorn-f30c80.netlify.app/seven_brothers.jpg"
          className="rounded-t h-72 w-full object-contain"
        />
        <div className="p-4">
          <h3 className="text-lg text-center font-bold leading-relaxed text-gray-800">{title}</h3>
          {/*         <h4 className="text-center text-sm text-gray-600 font-bold mt-0 pt-0 mb-4">
            {author !== undefined ? author[0].name : null}
          </h4> */}
          <p className="leading-5 text-center text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-center">
        <Link to={`/books/${id}`}>Read more</Link>
      </div>
    </div>
  )
}

export default BookIntro
