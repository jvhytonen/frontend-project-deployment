import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

import InputItem from '../../FormControls/InputItem/InputItem'
import { AppDispatch, RootState } from '../../../store'
import { addNewCategory } from '../../../features/slices/categorySlice'
import { finished, openModal, openErrorModal } from '../../../features/slices/modalSlice'
import { Category } from '../../../features/types/reduxTypes'
import { CategoryPostRequest } from '../../../features/types/requestTypes'

function AddCategory() {
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const error = useSelector((state: RootState) => state.category.error)
  const [newCategory, setNewCategory] = useState<Category | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    setNewCategory((prevState) => ({
      ...prevState,
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
    if (token !== null && newCategory !== null) {
      // All data needed in redux slice to send the request: token and body.
      const categoryData: CategoryPostRequest = {
        data: newCategory,
        token: token
      }
      // Send data to server via Redux thunk
      if (newCategory) {
        try {
          await dispatch(addNewCategory(categoryData)).unwrap()
          dispatch(finished({ heading: 'Success', content: 'Category added succesfully!' }))
          navigate('../admin/dashboard')
        } catch (err) {
          // We must add some delay to this before we can show the message as otherwise error is empty.
          setTimeout(() => {
            dispatch(openErrorModal({ heading: 'An error!', content: error }))
          }, 100)
        }
      }
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[200px]">
        <h2 className="font-bold text-2xl">Add category:</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
          <InputItem
            fieldName="name"
            name="name"
            labelText="Category name"
            placeholder="Add the name of the category here"
            type="text"
            handleChange={handleChange}
          />
          <div>
            <Button
              color="blue"
              onClick={(e) => {
                e.preventDefault()
                dispatch(
                  openModal({
                    heading: 'Confirm action',
                    content: `Are you sure you want to add new category "${newCategory?.name}"?`
                  })
                )
              }}>
              Add category
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AddCategory
