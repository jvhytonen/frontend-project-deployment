import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Book } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import Button from '../Button/Button'
import { updateBook } from '../../features/book/bookSlice'
import { validateBookData } from '../../features/validation/validate'

function EditBook() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const item = book.items ? book.items?.find((book) => Number(params.isbn) === book.ISBN) : null
  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)
  const [validationError, setValidationError] = useState<boolean>(false)

  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    if (bookToEdit !== null) {
      setBookToEdit((prevState) => ({
        ...(prevState as Book),
        [name]: value
      }))
    }
  }
  const handleSubmit = () => {
    if (validationError) {
      setValidationError(false)
    }
    if (bookToEdit) {
      if (validateBookData(bookToEdit)) {
        dispatch(updateBook(bookToEdit))
        setBookToEdit(null)
      } else {
        setValidationError(true)
      }
    }
  }
  return (
    <>
      {validationError ? (
        <p className="text-lg bg-red-800 underline">Do not leave any field empty!</p>
      ) : null}
      {bookToEdit ? (
        <div className="flex flex-col justify-center items-center w-full mt-[100px]">
          <h2 className="font-bold text-2xl">Edit book:</h2>
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
                value={bookToEdit.title}
                type="text"
                placeholder="Name"
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
                value={bookToEdit.authors}
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
                value={bookToEdit.description}
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
                value={bookToEdit.publisher}
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
                value={bookToEdit.published}
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
                value={bookToEdit.ISBN}
                id="isbn"
                name="isbn"
                type="number"
                placeholder="ISBN"
              />
            </div>
            <Button label="Save" handleClick={handleSubmit} />
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditBook
