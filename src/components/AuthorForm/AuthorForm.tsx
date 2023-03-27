import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button/Button'
import { Author } from '../../features/types/types'
import { AppDispatch } from '../../store'
import { addAuthor } from '../../features/author/authorSlice'

type AddAuthorType = Omit<Author, 'id'>

function AuthorForm() {
  const [authorName, setAuthorName] = useState<string | null>(null)
  const [authorDescr, setauthorDescr] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    if (e.target.id === 'author-name') {
      setAuthorName(e.target.value)
    }
    if (e.target.id === 'author-description') {
      setauthorDescr(e.target.value)
    }
  }
  const handleSubmit: () => void = () => {
    const newAuthor: AddAuthorType = {
      name: authorName as string,
      description: authorDescr as string
    }
    dispatch(addAuthor(newAuthor))
    setAuthorName(null)
    setauthorDescr(null)
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h2>Author edit here:</h2>
      <div className="w-full m-3">
        <label htmlFor="author-name">Name </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          id="author-name"
          type="text"
          placeholder="name"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="author-description">Description about the author </label>
      </div>
      <div className="w-full border-2 border-black">
        <textarea
          onChange={(event) => handleChange(event)}
          cols={50}
          rows={4}
          id="author-description"
          placeholder="Write a short description about the author"
        />
      </div>
      <div>
        <Button label="Add author to the list" type="add" handleClick={handleSubmit} />
      </div>
    </div>
  )
}

export default AuthorForm
