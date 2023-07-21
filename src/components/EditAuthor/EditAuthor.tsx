import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Author } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import Button from '../Button/Button'
import { validateAuthorData } from '../../features/validation/validate'
import { updateAuthor } from '../../features/slices/authorSlice'

function EditAuthor() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author)
  const item = authors.items ? authors.items?.find((author) => params.id === author.id) : null
  const [authorToEdit, setAuthorToEdit] = useState<Author | null | undefined>(item)
  const [validationError, setValidationError] = useState<boolean>(false)
  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    if (authorToEdit !== null) {
      setAuthorToEdit((prevState) => ({
        ...(prevState as Author),
        [name]: value
      }))
    }
  }
  const handleSubmit = () => {
    if (validationError) {
      setValidationError(false)
    }
    if (authorToEdit) {
      if (validateAuthorData(authorToEdit)) {
        dispatch(updateAuthor(authorToEdit))
        setAuthorToEdit(null)
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
      {authorToEdit ? (
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
                value={authorToEdit.name}
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
                value={authorToEdit.description}
                cols={50}
                rows={4}
                id="description"
                name="description"
                placeholder="Write a short description about the author"
              />
            </div>
            <div>
              <Button label="Save changes" handleClick={handleSubmit} />
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditAuthor
