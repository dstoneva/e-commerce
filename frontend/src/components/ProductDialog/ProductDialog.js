import { Dialog, DialogTitle, DialogContent, IconButton, CircularProgress, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useSWR from 'swr'
import { QuickView } from './components'

export default function ProductDialog({ isDialogOpened, handleCloseDialog, productId, thumbnail }) {
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(isDialogOpened ? `/products/${productId}` : null, { dedupingInterval: 60000 })

  const handleClose = () => {
    handleCloseDialog(false)
  }


  return (
    <Dialog maxWidth="md" open={isDialogOpened} onClose={handleClose} aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title">
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
      <DialogContent sx={{ my: 1 }}>
        {isLoading && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 250, sm: 300 },
              minWidth: { xs: 300, md: 800 },
              mx: 'auto',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Typography color="error">Failed to load product data</Typography>
          </Box>
        )}
        {product && <QuickView product={product} thumbnail={thumbnail} />}
      </DialogContent>
    </Dialog>
  )
}
