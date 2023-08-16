import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../Button/Button'
import { Author, AuthorPostRequest, FormElement } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import { addNewAuthor } from '../../features/slices/authorSlice'
import { validateAuthorData } from '../../features/validation/validate'
import Modal from '../Modal/Modal'
import TextArea from '../FormControls/TextArea/TextArea'
import InputItem from '../FormControls/InputItem/InputItem'
import { useModal } from '../../features/hooks/useModal'

function AddAuthor() {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const token = useSelector((state: RootState) => state.auth.token)
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
  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setNewAuthor(null)
    navigate('../admin/dashboard')
  }
  const handleSubmit: () => void = async () => {
    event?.preventDefault()
    //close modal
    setShowConfirmation(false)
    if (token !== null && newAuthor !== null) {
      // All data needed in redux slice to send the request: token and body.
      const authorData: AuthorPostRequest = {
        data: newAuthor,
        token: token
      }
      // Send data to server via Redux thunk
      if (newAuthor) {
        await dispatch(addNewAuthor(authorData)).unwrap()
        setShowCompletion(true)
      }
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[200px]">
        <h2 className="font-bold text-2xl">Add new author</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              label="Add author to the list"
              handleClick={(e) =>
                handleConfirm(e, `Are you sure you want to add new author "${newAuthor?.name}"`)
              }
              type="neutral"
            />
          </div>
        </form>
      </div>
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && (
        <Modal
          type="confirm"
          heading={'Confirm adding new category'}
          text={confirmationText}
          onConfirm={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'New author succesfully added'}
          text={`New author "${newAuthor?.name}" added.`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}

export default AddAuthor
