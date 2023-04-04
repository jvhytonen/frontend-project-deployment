import React from 'react'
import { ButtonType } from '../../features/types/types'

export type HandleClick = () => void

function Button({ label, handleClick }: ButtonType) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      onClick={handleClick}>
      {label}
    </button>
  )
}

export default Button
