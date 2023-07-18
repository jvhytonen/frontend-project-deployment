import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Book } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import Button from '../Button/Button'
import { updateBook } from '../../features/book/bookSlice'
import { validateUpdatedBookData } from '../../features/validation/validate'
import InputItem from '../InputItem/InputItem'

function EditBook() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const item = book.items ? book.items?.find((book) => params.id === book.id) : null
  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)
  const [validationError, setValidationError] = useState<boolean>(false)

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    console.log(value)
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
      if (validateUpdatedBookData(bookToEdit)) {
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
      {bookToEdit && authors !== null && categories !== null ? (
        <div className="flex flex-col justify-center items-center w-full mt-[100px]">
          <h2 className="font-bold text-2xl">Edit book:</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Title */}
            <InputItem
              fieldName="title"
              name="title"
              labelText="Title"
              value={bookToEdit.title}
              placeholder="Title"
              type="text"
              handleChange={handleChange}
            />
            {/* Author */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <select
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={bookToEdit.author.id}
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
            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={bookToEdit.category.id}
                id="categoryId"
                name="categoryId">
                <option value="">Select category</option>
                {Object.entries(categories).map(([id, category]) => (
                  <option key={id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Description */}
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
            {/* Imageurl */}
            <InputItem
              fieldName="imageUrl"
              name="imageUrl"
              labelText="Image"
              value={bookToEdit.imageUrl}
              placeholder="Add the URL of the book-cover here"
              type="text"
              handleChange={handleChange}
            />
            {/* Publisher */}
            <InputItem
              fieldName="publisher"
              name="publisher"
              labelText="Publisher"
              value={bookToEdit.publisher}
              placeholder="Publisher"
              type="text"
              handleChange={handleChange}
            />
            {/* Publish year */}
            <InputItem
              fieldName="yearPublished"
              name="yearPublished"
              labelText="Published"
              value={bookToEdit.yearPublished}
              placeholder="Year published"
              type="text"
              handleChange={handleChange}
            />
            {/* ISBN */}
            <InputItem
              fieldName="isbn"
              name="isbn"
              labelText="ISBN"
              value={bookToEdit.isbn}
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
