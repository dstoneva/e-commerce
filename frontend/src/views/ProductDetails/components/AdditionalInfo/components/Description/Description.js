import { Box, Typography } from '@mui/material'

const Description = ({ product, isLoading }) => {
  return (
    <Box>
      <Typography fontSize={22} fontWeight={600} sx={{ my: 3 }}>
        Specification:
      </Typography>
      {product.brand && <Typography fontSize={15}>Brand: {product.brand}</Typography>}
      <Typography fontSize={15}>Model: {product.title}</Typography>
      <Typography fontSize={15}>{product.description}</Typography>
    </Box>
  )
}

export default Description
