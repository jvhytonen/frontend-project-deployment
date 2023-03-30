import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../store'

function Authors() {
  const { items, error } = useSelector((state: RootState) => state.author)
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">Authors: </h2>
      <div className="w-full mx-8 my-8 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-20 w-[80%]">
          {items !== null
            ? items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>
                    <div className="flex justify-end">
                      {user.isAdmin ? <Link to={`edit/${item.id}`}>Edit author</Link> : null}
                    </div>
                  </div>
                )
              })
            : null}
        </div>
        {error ? <p className="text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}

export default Authors
