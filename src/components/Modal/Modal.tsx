import React from 'react'
import { ModalType } from '../../features/types/types'
import Button from '../Button/Button'

function Modal({ heading, text, type, onConfirm, onCancel }: ModalType) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-70">
      <div className="w-[500px] h-[200px] bg-slate-200 rounded-lg border-black border-2 flex flex-col items-center justify-around">
        <h2 className="font-bold text-2xl">{heading}</h2>
        <p>{text}</p>
        {type == 'error' ? <Button label={'OK'} handleClick={onConfirm} type="neutral" /> : null}
        {type == 'confirm' && onCancel ? (
          <>
            <Button label={'OK'} handleClick={onConfirm} type="confirm" />
            <Button label={'Cancel'} handleClick={onCancel} type="cancel" />
          </>
        ) : null}
        {type == 'success' ? <Button label={'OK'} handleClick={onConfirm} type="neutral" /> : null}
      </div>
    </div>
  )
}

export default Modal
