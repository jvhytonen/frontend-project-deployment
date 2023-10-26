import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../../Button/Button'
import { AppDispatch, RootState } from '../../../store'
import { addNewAuthor } from '../../../features/slices/authorSlice'
import TextArea from '../../FormControls/TextArea/TextArea'
import InputItem from '../../FormControls/InputItem/InputItem'
import { finished, openErrorModal, openModal } from '../../../features/slices/modalSlice'
import { Author } from '../../../features/types/reduxTypes'
import { FormElement } from '../../../features/types/componentTypes'
import { AuthorPostRequest } from '../../../features/types/requestTypes'

function AddAuthor() {
  const modal = useSelector((state: RootState) => state.modal)
  const token = useSelector((state: RootState) => state.auth.token)
  const error = useSelector((state: RootState) => state.author.error)
  const [newAuthor, setNewAuthor] = useState<Author | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (e: ChangeEvent<FormElement>) => void = (e) => {
    const { value, name } = e.target
    setNewAuthor((prevState) => ({
      ...(prevState as Author),
      [name]: value
    }))
  }

  useEffect(() => {
    if (modal.type === 'confirmed') {
      handleSubmit()
    }
  }, [modal.type])

  const handleSubmit: () => void = async () => {
    event?.preventDefault()

    if (token !== null && newAuthor !== null) {
      // All data needed in redux slice to send the request: token and body.
      const authorData: AuthorPostRequest = {
        data: newAuthor,
        token: token
      }
      // Send data to server via Redux thunk
      if (newAuthor) {
        try {
          await dispatch(addNewAuthor(authorData)).unwrap()
          dispatch(finished({ heading: 'Success!', content: 'Author added succesfully!' }))
          navigate('../admin/dashboard')
        } catch (err) {
          dispatch(openErrorModal({ heading: 'An error!', content: error }))
        }
      }
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[200px]">
        <h2 className="font-bold text-2xl">Add new author</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
          <InputItem
            fieldName="name"
            name="name"
            labelText="Name"
            placeholder="Name of the author"
            type="text"
            handleChange={handleChange}
          />
          <TextArea
            fieldName="description"
            labelText="Description about the author"
            placeholder="Write a short description about the author"
            handleChange={handleChange}
          />
          <div>
            <Button
              label="Add author"
              handleClick={(e) => {
                e.preventDefault()
                dispatch(
                  openModal({
                    heading: 'Confirmation needed',
                    content: `Are you sure you want to add new author "${newAuthor?.name}"?`
                  })
                )
              }}
              type="neutral"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default AddAuthor
