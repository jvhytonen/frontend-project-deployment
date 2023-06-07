import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { AddNewBookType } from '../../features/types/types'
import { addBook, addNewBook } from '../../features/book/bookSlice'
import { validateBookData } from '../../features/validation/validate'
import { useNavigate } from 'react-router-dom'
import InputItem from '../InputItem/InputItem'

function AddBook() {
  const [newBook, setNewBook] = useState<AddNewBookType | null>(null)
  const [validationError, setValidationError] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
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
      console.log(newBook)
      newBook.categoryId = '504b0f47-5046-4704-9c07-1aa8ce948d74'
      if (validateBookData(newBook)) {
        dispatch(addBook(newBook))
        console.log(newBook)
        setNewBook(null)
        navigate('/books')
      } else {
        setValidationError(true)
      }
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      {validationError ? (
        <p className="text-lg bg-red-800 underline">
          Please make sure you have filled all fields!{' '}
        </p>
      ) : null}
      {authors !== null && categories !== null ? (
        <div className="flex flex-col justify-center items-center w-full mt-[100px]">
          <h2 className="font-bold text-2xl">Add new book:</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
      ) : (
        'No authors!'
      )}
    </div>
  )
}

export default AddBook
