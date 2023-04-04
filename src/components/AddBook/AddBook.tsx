import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button/Button'
import { AppDispatch } from '../../store'
import { AddNewBookType } from '../../features/types/types'
import { addBook } from '../../features/book/bookSlice'
import { validateBookData } from '../../features/validation/validate'
import { useNavigate } from 'react-router-dom'

function AddBook() {
  const [newBook, setNewBook] = useState<AddNewBookType | null>(null)
  const [validationError, setValidationError] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    console.log(name)
    setNewBook((prevState) => ({
      ...(prevState as AddNewBookType),
      [name]: value
    }))
  }
  const handleSubmit: () => void = () => {
    event?.preventDefault()
    if (validationError) {
      setValidationError(false)
    }
    if (newBook) {
      if (validateBookData(newBook)) {
        dispatch(addBook(newBook))
      } else {
        setValidationError(true)
      }
      setNewBook(null)
      navigate('/books')
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      {validationError ? (
        <p className="text-lg bg-red-800 underline">
          Please make sure you have filled all fields!{' '}
        </p>
      ) : null}
      <div className="flex flex-col justify-center items-center w-full mt-[100px]">
        <h2 className="font-bold text-2xl">Add new book:</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => handleChange(event)}
              id="title"
              name="title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
          </div>
          <div className="mb-4">
            <input
              onChange={(event) => handleChange(event)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="authors"
              name="authors"
              type="text"
              placeholder="Authors"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description about the book
            </label>
          </div>
          <div className="mb-4">
            <textarea
              onChange={(event) => handleChange(event)}
              cols={50}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              id="description"
              placeholder="Write a short description about the author"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
              Publisher
            </label>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(event) => handleChange(event)}
              id="publisher"
              name="publisher"
              type="text"
              placeholder="Publisher"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="published">
              Published
            </label>
          </div>
          <div className="mb-4">
            <input
              onChange={(event) => handleChange(event)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="published"
              name="published"
              type="number"
              placeholder="Published"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
              ISBN
            </label>
          </div>
          <div className="mb-4">
            <input
              onChange={(event) => handleChange(event)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="isbn"
              name="isbn"
              type="number"
              placeholder="ISBN"
            />
          </div>
          <Button label="Save" handleClick={handleSubmit} />
        </form>
      </div>
    </div>
  )
}

export default AddBook
