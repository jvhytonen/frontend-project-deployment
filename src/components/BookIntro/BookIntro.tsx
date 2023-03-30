import React from 'react'
import { Link } from 'react-router-dom'

import { BookIntroType } from '../../features/types/types'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

function BookIntro({ ISBN, title, description, url }: BookIntroType) {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={url}
          alt=""
        />
        <div className="flex flex-col justify-between p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{description}</p>
          <div className="flex justify-around">
            <Link to={`${ISBN}`}>Read more</Link>{' '}
            {user.isAdmin ? <Link to={`/edit/${ISBN}`}>Edit</Link> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookIntro
