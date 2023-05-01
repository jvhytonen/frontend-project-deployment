import React, { useEffect, useState } from 'react'
import { Book } from '../../features/types/types'
import { FilterType } from '../Books/Books'

type FilterAuthorsCheckbox = {
  author: string
  defaultChecked: boolean
  filterBooks: FilterType
}

function FilterAuthorCheckbox({ author, defaultChecked, filterBooks }: FilterAuthorsCheckbox) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked)
  const handleSetChecked = () => {
    setIsChecked((isChecked) => !isChecked)
    filterBooks(author)
  }

  useEffect(() => {
    setIsChecked(defaultChecked)
  }, [defaultChecked])

  return (
    <div className="flex">
      <input
        checked={isChecked}
        onChange={handleSetChecked}
        id="author-checkbox"
        type="checkbox"
        value={author}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="author-checkbox" className="ml-2 text-sm font-medium text-gray-900">
        {author}
      </label>
    </div>
  )
}

export default FilterAuthorCheckbox
