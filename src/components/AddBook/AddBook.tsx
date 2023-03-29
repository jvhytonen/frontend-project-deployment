import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button/Button'
import { AppDispatch } from '../../store'
import { AddNewBookType } from '../../features/types/types'
import { addBook } from '../../features/book/bookSlice'

function AddBook() {
  const [newBook, setNewBook] = useState<AddNewBookType | null>(null)

  const [validationError, setValidationError] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    setNewBook((prevState) => ({
      ...(prevState as AddNewBookType),
      [name]: value
    }))
  }
  const validateForm = (formInputs: AddNewBookType) => {
    // Validation still in progress with number values (ISBN && published)
    if (
      formInputs.title.length > 1 &&
      formInputs.authors.length > 1 &&
      formInputs.description.length > 1 &&
      formInputs.publisher.length > 1
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit: () => void = () => {
    if (validationError) {
      setValidationError(false)
    }
    if (newBook) {
      const isGood = validateForm(newBook)
      console.log(isGood)
      if (validateForm(newBook)) {
        dispatch(addBook(newBook))
        setNewBook(null)
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
      <h2>Add new book:</h2>
      <div className="w-full m-3">
        <label htmlFor="title">Title </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          id="title"
          name="title"
          type="text"
          placeholder="Title"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="author">Author </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          id="authors"
          name="authors"
          type="text"
          placeholder="Authors"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="description">Description about the book </label>
      </div>
      <div className="w-full border-2 border-black">
        <textarea
          onChange={(event) => handleChange(event)}
          cols={50}
          rows={4}
          name="description"
          id="description"
          placeholder="Write a short description about the author"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="publisher">Publisher </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          name="publisher"
          id="publisher"
          type="text"
          placeholder="Publisher"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="published">Published </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          name="published"
          id="published"
          type="number"
          placeholder="Published"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="ISBN">ISBN </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          name="ISBN"
          id="ISBN"
          type="number"
          placeholder="ISBN"
        />
      </div>
      <div>
        <Button label="Add book to the list" type="add" handleClick={handleSubmit} />
      </div>
    </div>
  )
}

export default AddBook
