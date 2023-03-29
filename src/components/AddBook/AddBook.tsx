import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../Button/Button'
import { AppDispatch } from '../../store'
import { AddBookType } from '../../features/types/types'
import { addBook } from '../../features/book/bookSlice'

function AddBook() {
  const [ISBN, setISBN] = useState<number>()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [publisher, setPublisher] = useState<string>('')
  const [authors, setAuthors] = useState<string>('')
  const [published, setPublished] = useState<number | undefined>()

  const [validationError, setValidationError] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value)
    }
    if (e.target.id === 'description') {
      setDescription(e.target.value)
    }
    if (e.target.id === 'authors') {
      setAuthors(e.target.value)
    }
    if (e.target.id === 'isbn') {
      setISBN(Number(e.target.value))
    }

    if (e.target.id === 'publisher') {
      setPublisher(e.target.value)
    }

    if (e.target.id === 'published') {
      setPublished(Number(e.target.value))
    }
  }
  const validateForm = (formInputs: AddBookType) => {
    if (
      formInputs.title &&
      formInputs.description &&
      formInputs.authors &&
      typeof formInputs.ISBN === 'number' &&
      formInputs.publisher &&
      typeof formInputs.published === 'number'
    ) {
      return true
    } else return false
  }

  const resetValues = () => {
    setTitle('')
    setISBN(undefined)
    setDescription('')
    setPublisher('')
    setAuthors('')
    setPublished(undefined)
  }
  const handleSubmit: () => void = () => {
    if (validationError) {
      setValidationError(false)
    }
    const newBook: AddBookType = {
      ISBN: ISBN as number,
      title: title as string,
      description: description as string,
      publisher: publisher as string,
      authors: authors as string,
      published: published as number
    }
    validateForm(newBook)
    if (validateForm(newBook)) {
      dispatch(addBook(newBook))
      resetValues()
    } else {
      setValidationError(true)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      {validationError ? (
        <p className="text-lg bg-red-800 underline">
          Please make sure you have filled all fields!{' '}
        </p>
      ) : null}
      <h2>Book edit here:</h2>
      <div className="w-full m-3">
        <label htmlFor="title">Title </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          id="title"
          value={title}
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
          value={authors}
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
          value={description}
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
          value={publisher}
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
          value={published}
          id="published"
          type="number"
          placeholder="Published"
        />
      </div>
      <div className="w-full m-3">
        <label htmlFor="isbn">ISBN </label>
      </div>
      <div className="w-full border-2 border-black">
        <input
          onChange={(event) => handleChange(event)}
          className="w-full"
          value={ISBN}
          id="isbn"
          type="number"
          placeholder="ISBN"
        />
      </div>
      <div>
        <Button label="Add author to the list" type="add" handleClick={handleSubmit} />
      </div>
    </div>
  )
}

export default AddBook
