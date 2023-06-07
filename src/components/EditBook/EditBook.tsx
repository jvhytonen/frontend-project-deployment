import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Book } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import Button from '../Button/Button'
import { updateBook } from '../../features/book/bookSlice'
import { validateBookData } from '../../features/validation/validate'
import InputItem from '../InputItem/InputItem'

function EditBook() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const authors = useSelector((state: RootState) => state.author.items)
  const item = book.items ? book.items?.find((book) => params.id === book.id) : null
  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)
  const [validationError, setValidationError] = useState<boolean>(false)

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
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
    /*     if (bookToEdit) {
      if (validateBookData(bookToEdit)) {
        dispatch(updateBook(bookToEdit))
        setBookToEdit(null)
      } else {
        setValidationError(true)
      }
    } */
  }
  return (
    <>
      {validationError ? (
        <p className="text-lg bg-red-800 underline">Do not leave any field empty!</p>
      ) : null}
      {bookToEdit && authors !== null ? (
        <div className="flex flex-col justify-center items-center w-full mt-[100px]">
          <h2 className="font-bold text-2xl">Edit book:</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/*        <div className="mb-4">
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
            </div> */}
            <InputItem
              fieldName="title"
              name="title"
              labelText="Title"
              placeholder="Title"
              type="text"
              handleChange={handleChange}
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <select
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="authorId"
                name="authorId">
                <option value="">Select an author</option>
                {Object.entries(authors).map(([id, author]) => (
                  <option key={id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
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
            <InputItem
              fieldName="imageUrl"
              name="imageUrl"
              labelText="Image"
              placeholder="Add the URL of the book-cover here"
              type="text"
              handleChange={handleChange}
            />
            <InputItem
              fieldName="publisher"
              name="publisher"
              labelText="Publisher"
              placeholder="Publisher"
              type="text"
              handleChange={handleChange}
            />
            <InputItem
              fieldName="yearPublished"
              name="yearPublished"
              labelText="Published"
              placeholder="Year published"
              type="text"
              handleChange={handleChange}
            />
            <InputItem
              fieldName="isbn"
              name="isbn"
              labelText="ISBN"
              placeholder="ISBN"
              type="text"
              handleChange={handleChange}
            />
            <Button label="Save" handleClick={handleSubmit} />
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditBook
