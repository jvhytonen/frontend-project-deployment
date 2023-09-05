import React from 'react'
import { ButtonType } from '../../features/types/componentTypes'

export type HandleClick = () => void

function Button({ label, handleClick, type }: ButtonType) {
  let style
  switch (type) {
    case 'neutral':
      style =
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
      break
    case 'confirm':
      style =
        'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-black border-2 rounded'
      break
    case 'edit':
      style = 'bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded'
      break
    case 'cancel':
      style = 'bg-slate-100 hover:bg-slate-500 font-bold py-2 px-4 border-black border-2 rounded'
      break
    case 'borrow':
      style = 'bg-amber-200 hover:bg-amber-500 font-bold py-2 px-4 border-black border-2 rounded'
      break
    case 'return':
      style = 'bg-lime-300 hover:bg-yellow-500 font-bold py-2 px-4 border-black border-2 rounded'
      break
    case 'delete':
      style =
        'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
      break
    default:
      style =
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
  }
  return (
    <button className={style} onClick={handleClick}>
      {label}
    </button>
  )
}

export default Button
