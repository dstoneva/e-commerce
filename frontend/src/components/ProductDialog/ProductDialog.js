import { Fragment } from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function ProductDialog({ isDialogOpened, handleCloseDialog, product }) {
  const handleClose = () => {
    handleCloseDialog(false)
  }

  return (
    <Fragment>
      <Dialog maxWidth="md" open={isDialogOpened} onClose={handleClose} aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title" marginBottom={2}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </Fragment>
  )
}
