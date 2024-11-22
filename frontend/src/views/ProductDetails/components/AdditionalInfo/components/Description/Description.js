import { Box, Typography, Skeleton } from '@mui/material'

const Description = ({ product, isLoading }) => {
  return (
    <Box>
      <Typography fontSize={22} fontWeight={600} sx={{ my: 3 }}>
        Specification:
      </Typography>

      {isLoading ? (
        <>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width="90%" height={24} />
          <Skeleton variant="text" width="50%" height={24} />
        </>
      ) : (
        <>
          {product.brand && <Typography fontSize={15}>Brand: {product.brand}</Typography>}
          <Typography fontSize={15}>Model: {product.title}</Typography>
          <Typography fontSize={15}>{product.description}</Typography>
        </>
      )}
    </Box>
  )
}

export default Description
