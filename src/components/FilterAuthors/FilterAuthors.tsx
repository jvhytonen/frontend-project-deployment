import React, { useState } from 'react'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import FilterAuthorCheckbox from '../FilterAuthorCheckbox/FilterAuthorCheckbox'
import { FilterType } from '../Books/Books'

type FilterAuthors = {
  filterBooks: FilterType
}

function FilterAuthors({ filterBooks }: FilterAuthors) {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(true)
  const { items, error } = useSelector((state: RootState) => state.author)
  const handleSetAllChecked = () => {
    setIsAllChecked(!isAllChecked)
  }
  return (
    <div className="fixed top 5 right-6 w-1/4 border-black border-2 bg-white">
      <h4 className="text-center my-2">Filter authors</h4>
      <div className="grid grid-cols-1 gap-4 p-3">
        <div className="flex">
          <input
            defaultChecked={true}
            onClick={handleSetAllChecked}
            id="author-checkbox"
            type="checkbox"
            value={'All authors'}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="author-checkbox" className="ml-2 text-sm font-medium text-gray-900">
            All authors
          </label>
        </div>
        {items
          ? items.map((item) => {
              return (
                <FilterAuthorCheckbox
                  filterBooks={filterBooks}
                  key={item.id}
                  author={item.name}
                  defaultChecked={isAllChecked}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

export default FilterAuthors
