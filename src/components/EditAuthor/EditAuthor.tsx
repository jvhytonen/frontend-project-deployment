import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Author } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import Button from '../Button/Button'
import { validateAuthorData } from '../../features/validation/validate'
import { updateAuthor } from '../../features/author/authorSlice'

function EditAuthor() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author)
  const item = authors.items
    ? authors.items?.find((author) => Number(params.id) === author.id)
    : null
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
    <div>
      {validationError ? (
        <p className="text-lg bg-red-800 underline">Do not leave any field empty!</p>
      ) : null}
      {authorToEdit ? (
        <>
          <h2>Edit author:</h2>
          <div className="w-full m-3">
            <label htmlFor="name">Name </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              id="name"
              name="name"
              value={authorToEdit.name}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="w-full m-3">
            <label htmlFor="description">Description </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              id="description"
              name="description"
              value={authorToEdit.description}
              type="text"
              placeholder="Description"
            />
          </div>
        </>
      ) : null}
      <Button label="Save" styleType="save" handleClick={handleSubmit}></Button>
    </div>
  )
}

export default EditAuthor
