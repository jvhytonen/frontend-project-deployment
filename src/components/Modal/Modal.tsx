import React from 'react'

import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { resetModal } from '../../features/slices/modalSlice'
import { ModalProps } from '../../features/types/componentTypes'

function Modal({ heading, text, type, onConfirm, onCancel }: ModalProps) {
  const modal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch<AppDispatch>()

  const cancel = () => {
    dispatch(resetModal())
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-70">
      <div className="w-[500px] h-[200px] bg-sky-100 rounded-lg border-black border-2 flex flex-col items-center justify-around">
        <h2 className="font-bold text-2xl">{heading}</h2>
        <p>{text}</p>
        {type === 'error' || type === 'finished' ? (
          <Button label={'OK'} handleClick={onConfirm} type="neutral" />
        ) : null}
        {type == 'waitingConfirmation' ? (
          <div className="w-full flex justify-around">
            <Button label={'Yes'} handleClick={onConfirm} type="confirm" />
            <Button label={'Cancel'} handleClick={cancel} type="cancel" />
          </div>
        ) : null}
        {type == 'confirm' && onCancel ? (
          <div className="w-full flex justify-around">
            <Button label={'Yes'} handleClick={onConfirm} type="confirm" />
            <Button label={'Cancel'} handleClick={cancel} type="cancel" />
          </div>
        ) : null}
        {type == 'success' ? <Button label={'OK'} handleClick={onConfirm} type="neutral" /> : null}
      </div>
    </div>
  )
}

export default Modal
