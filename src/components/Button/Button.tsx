import React, { MouseEventHandler } from 'react'

type Button = {
  label: string
  type: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export type HandleClick = () => void

function Button({ label, type, handleClick }: Button) {
  let style
  switch (type) {
    case 'borrow':
      style = 'text-green-700'
      break
    case 'return':
      style = 'text-blue-700'
      break
    case 'edit':
      style = 'text-yellow-700'
      break
    case 'delete':
      style = 'text-red-700'
      break
    case 'add':
      style = 'text-green-500'
      break
    default:
      style = ''
  }
  return (
    <button className={style} onClick={handleClick}>
      {label}
    </button>
  )
}

export default Button
