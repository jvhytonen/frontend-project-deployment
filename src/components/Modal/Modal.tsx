import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { closeModal, confirm } from '../../features/slices/modalSlice'

function Modal() {
  const dispatch = useDispatch<AppDispatch>()
  const modal = useSelector((state: RootState) => state.modal)

  return (
    <>
      <Dialog open={modal.isOpen} handler={closeModal}>
        <DialogHeader>{modal.heading}</DialogHeader>
        <DialogBody>{modal.content}</DialogBody>
        <DialogFooter>
          {modal.type === 'finished' || modal.type === 'error' ? (
            <Button
              variant="text"
              color="green"
              onClick={() => dispatch(closeModal())}
              className="mr-1">
              <span>OK</span>
            </Button>
          ) : null}
          {modal.type == 'confirm' ? (
            <>
              <Button
                variant="text"
                color="red"
                onClick={() => dispatch(closeModal())}
                className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={() => dispatch(confirm())}>
                <span>Confirm</span>
              </Button>
            </>
          ) : null}
        </DialogFooter>
      </Dialog>
    </>
  )
}
export default Modal
