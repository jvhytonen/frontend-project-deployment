import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getCopies } from '../../features/slices/copySlice'
import Copy from '../Copy/Copy'

function EditCopy() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const copies = useSelector((state: RootState) => state.copy)

  useEffect(() => {
    if (params.id) {
      dispatch(getCopies(params.id))
    }
  }, [])
  return (
    <div className="flex flex-col justify-center items-center w-full mt-[200px]">
      <h2>{params.id}</h2>
      <h2 className="font-bold text-2xl">Copies: {copies.items ? copies.items.length : '0'}</h2>
      {copies?.items?.map((copy) => {
        console.log(copy)
        return <p key={copy.copyId}>{copy.copyId} hutasoo</p>
      })}
    </div>
  )
}

export default EditCopy
