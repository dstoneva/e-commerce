import { CircularProgress, Stack } from '@mui/material'

const Loading = () => {
  return (
    <Stack justifyContent="center" alignContent="center" alignItems="center" direction="row">
      <CircularProgress />
    </Stack>
  )
}

export default Loading
