import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../store'
import AuthorDetails from '../AuthorDetails/AuthorDetails'
import { fetchAuthors } from '../../features/slices/authorSlice'

function Authors() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, error } = useSelector((state: RootState) => state.author)

  useEffect(() => {
    dispatch(fetchAuthors())
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">Authors: </h2>
      <div className="w-full mx-8 my-8 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-20 w-[80%]">
          {items !== null
            ? items.map((item) => {
                return (
                  <AuthorDetails
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                  />
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
