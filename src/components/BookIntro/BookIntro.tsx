import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { BookIntroType } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import { useSelector } from 'react-redux'
import { deleteBook } from '../../features/slices/bookSlice'

function BookIntro({ isbn, title, id, author, description, imageUrl }: BookIntroType) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <div className="my-0 ml-8 mr-auto py-2 sm:py-8 md:py-2 rounded-lg shadow-lg w-2/3 shadow-gray-200 bg-white">
      <div>
        <img
          src={imageUrl ? imageUrl : 'defaultCover.jpg'}
          className="rounded-t h-72 w-full object-contain"
        />
        <div className="p-4">
          <h3 className="text-lg text-center font-bold leading-relaxed text-gray-800">{title}</h3>
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
