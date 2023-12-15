import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../../store'
import Button from '../../Button/Button'
import { validateAuthorData } from '../../../features/validation/validate'
import { updateExistingAuthor } from '../../../features/slices/authorSlice'
import InputItem from '../../FormControls/InputItem/InputItem'
import TextArea from '../../FormControls/TextArea/TextArea'
import { confirm, finished, openModal } from '../../../features/slices/modalSlice'
import { Author } from '../../../features/types/reduxTypes'
import { FormElement } from '../../../features/types/componentTypes'
import { AuthorPostRequest } from '../../../features/types/requestTypes'

function EditAuthor() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const authors = useSelector((state: RootState) => state.author)
  const item = authors.items
    ? authors.items?.find((author: Author) => params.id === author.id)
    : null
  const [authorToEdit, setAuthorToEdit] = useState<Author | null | undefined>(item)
  const [validationError, setValidationError] = useState<boolean>(false)
  const handleChange: (e: ChangeEvent<FormElement>) => void = (e) => {
    const { value, name } = e.target
    if (authorToEdit !== null) {
      setAuthorToEdit((prevState) => ({
        ...(prevState as Author),
        [name]: value
      }))
    }
  }
  useEffect(() => {
    if (modal.type === 'confirmed') {
      handleSubmit()
    }
  }, [modal.type])

  const handleSubmit: () => void = () => {
    if (token !== null && authorToEdit !== null && authorToEdit !== undefined) {
      // All data needed in redux slice to send the request: token and body.
      const authorData: AuthorPostRequest = {
        data: authorToEdit,
        token: token
      }
      if (authorToEdit) {
        if (validateAuthorData(authorToEdit)) {
          dispatch(updateExistingAuthor(authorData))
        }
      }
      setAuthorToEdit(null)
      dispatch(finished({ heading: 'Success!', content: 'Author edited succesfully!' }))
      navigate('../admin/dashboard')
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
            <InputItem
              fieldName="name"
              name="name"
              labelText="Name"
              placeholder="Name of the category"
              value={authorToEdit.name}
              type="text"
              handleChange={handleChange}
            />
            <TextArea
              fieldName="description"
              labelText="Description about the author"
              placeholder="Write a short description about the author"
              defaultValue={authorToEdit.description}
              handleChange={handleChange}
            />
            <div>
              <Button
                label="Edit author"
                handleClick={(e) => {
                  e.preventDefault()
                  dispatch(
                    openModal({
                      heading: 'Confirm action',
                      modalContent: `Are you sure you want to add edit author "${authorToEdit?.name}"?`
                    })
                  )
                }}
                type="neutral"
              />
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditAuthor
