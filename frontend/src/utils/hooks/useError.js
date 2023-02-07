import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'

const useError = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      const errorMessage = error?.response?.data?.message

      errorMessage &&
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        })
    }
  }, [error, enqueueSnackbar])

  return { setError }
}

export default useError
