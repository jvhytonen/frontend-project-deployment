import React from 'react'
import { ModalType } from '../../features/types/types'
import Button from '../Button/Button'

function Modal({ heading, text, type, close }: ModalType) {
  return (
    <div className="absolute left-[20%] top-[20%] w-[500px] h-[200px] bg-slate-200 rounded-lg border-black flex flex-col items-center justify-around">
      <h2 className="font-bold text-2xl">{heading}</h2>
      <p>{text}</p>
      <Button label={'OK'} handleClick={close} type="neutral" />
    </div>
  )
}

export default Modal
