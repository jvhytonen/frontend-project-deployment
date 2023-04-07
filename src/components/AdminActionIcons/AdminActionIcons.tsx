import React from 'react'

import { AiFillDelete } from 'react-icons/ai'
import { GrEdit } from 'react-icons/gr'
import { HandleClick } from '../../features/types/types'

type AdminActionIcons = {
  editItem: HandleClick
  deleteItem: HandleClick
}

function AdminActionIcons({ editItem, deleteItem }: AdminActionIcons) {
  return (
    <div className="flex justify-between text-lg">
      <div onClick={deleteItem}>
        <span className="sr-only">Delete item</span>
        <AiFillDelete className="cursor-pointer" />
      </div>
      <div onClick={editItem}>
        <span className="sr-only">Edit item</span>
        <GrEdit className="cursor-pointer" />
      </div>
    </div>
  )
}

export default AdminActionIcons
