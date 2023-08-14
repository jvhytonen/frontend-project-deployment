import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Category, CategoryPostRequest } from '../../features/types/types'
import InputItem from '../FormControls/InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { addNewAuthor } from '../../features/slices/authorSlice'
import { validateAuthorData } from '../../features/validation/validate'
import { addNewCategory } from '../../features/slices/categorySlice'
import Modal from '../Modal/Modal'

function AddCategory() {
  const token = useSelector((state: RootState) => state.auth.token)
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
  /*   const handleCancel: () => void = () => {
    dispatch(nullifyCategoryModalInfo())
  }
  const handleConfirmation: () => void = () => {
    if (newCategory) {
      dispatch(setCategoryModalConfirmation())
    }
  } */
  const handleSubmit: () => void = () => {
    if (token !== null && newCategory !== null) {
      // All data needed in redux slice to send the request: token and body.
      const categoryData: CategoryPostRequest = {
        data: newCategory,
        token: token
      }
      if (newCategory) {
        dispatch(addNewCategory(categoryData))
      }
      setNewCategory(null)
      navigate('/categories')
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[200px]">
        <h2 className="font-bold text-2xl">Add category:</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <InputItem
            fieldName="name"
            name="name"
            labelText="Category name"
            placeholder="Add the name of the category here"
            type="text"
            handleChange={handleChange}
          />
          <div>
            <Button label="Add category" handleClick={handleSubmit} type="neutral" />
          </div>
        </form>
      </div>
      {/* {modalInfo !== null && modalInfo.type === 'confirmation' ? (
        <Modal
          type="confirm"
          heading={modalInfo.heading}
          text={modalInfo.message}
          onConfirm={handleSubmit}
          onCancel={handleCancel}
        />
      ) : null}
      {modalInfo !== null && modalInfo.type === 'success' ? (
        <Modal
          type="success"
          heading={modalInfo.heading}
          text={modalInfo.message}
          onConfirm={handleSubmit}
        />
      ) : null} */}
    </>
  )
}
export default AddCategory
