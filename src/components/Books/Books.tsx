import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import BookIntro from '../BookIntro/BookIntro'
import Search from '../Search/Search'

function Books() {
  const { items, error } = useSelector((state: RootState) => state.book)

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center text-4xl font-bold">Our books</h2>
      <div className="w-full mx-8 my-8 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 w-[80%]">
          {/* <Search /> */}
          {items !== null
            ? items.map((item) => {
                return (
                  <BookIntro
                    key={item.id}
                    ISBN={item.ISBN}
                    title={item.title}
                    authors={item.authors}
                    url={item.url}
                  />
                )
              })
            : null}
          {error ? <p className="text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Books
