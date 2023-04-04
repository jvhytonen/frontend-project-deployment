import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../Button/Button'
import { AddAuthorType } from '../../features/types/types'
import { AppDispatch } from '../../store'
import { addAuthor } from '../../features/author/authorSlice'
import { validateAuthorData } from '../../features/validation/validate'

function AddAuthor() {
  const [newAuthor, setNewAuthor] = useState<AddAuthorType | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    setNewAuthor((prevState) => ({
      ...(prevState as AddAuthorType),
      [name]: value
    }))
  }
  const handleSubmit: () => void = () => {
    event?.preventDefault()
    if (newAuthor) {
      if (validateAuthorData(newAuthor)) {
        dispatch(addAuthor(newAuthor))
      }
    }
    setNewAuthor(null)
    navigate('/authors')
  }
  return (
    <div className="flex flex-col justify-center items-center w-full mt-[200px]">
      <h2 className="font-bold text-2xl">Author edit here:</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => handleChange(event)}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description about the author
          </label>
        </div>
        <div className="mb-4">
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => handleChange(event)}
            cols={50}
            rows={4}
            id="description"
            name="description"
            placeholder="Write a short description about the author"
          />
        </div>
        <div>
          <Button label="Add author to the list" handleClick={handleSubmit} />
        </div>
      </form>
    </div>
  )
}

export default AddAuthor
