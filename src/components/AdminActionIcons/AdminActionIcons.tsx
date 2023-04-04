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
    <div className="flex justify-between">
      <AiFillDelete onClick={deleteItem} className="cursor-pointer" />{' '}
      <GrEdit onClick={editItem} className="cursor-pointer" />
    </div>
  )
}

export default AdminActionIcons
