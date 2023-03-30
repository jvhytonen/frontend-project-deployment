import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button/Button'
import { AddAuthorType } from '../../features/types/types'
import { AppDispatch } from '../../store'
import { addAuthor } from '../../features/author/authorSlice'
import { validateAuthorData } from '../../features/validation/validate'

function AddAuthor() {
  const [newAuthor, setNewAuthor] = useState<AddAuthorType | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    setNewAuthor((prevState) => ({
      ...(prevState as AddAuthorType),
      [name]: value
    }))
  }
  const handleSubmit: () => void = () => {
    if (newAuthor) {
      if (validateAuthorData(newAuthor)) {
        dispatch(addAuthor(newAuthor))
      }
    }
    setNewAuthor(null)
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
          id="name"
          name="name"
          type="text"
          placeholder="name"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="description">Description about the author </label>
      </div>
      <div className="w-full border-2 border-black">
        <textarea
          onChange={(event) => handleChange(event)}
          cols={50}
          rows={4}
          id="description"
          name="description"
          placeholder="Write a short description about the author"
        />
      </div>
      <div>
        <Button label="Add author to the list" styleType="add" handleClick={handleSubmit} />
      </div>
    </div>
  )
}

export default AddAuthor
