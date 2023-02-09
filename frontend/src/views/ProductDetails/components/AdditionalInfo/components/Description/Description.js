import { Box, Typography } from '@mui/material'

const Description = ({ product }) => {
  return (
    <Box>
      <Typography fontSize={22} fontWeight={600} sx={{ my: 3 }}>
        Specification:
      </Typography>
      <Typography fontSize={15}>Brand: {product.brand}</Typography>
      <Typography fontSize={15}>Model: {product.title}</Typography>
      <Typography fontSize={15}>{product.description}</Typography>
      <Typography fontSize={15}>Features: FM Radio, Card Supported (Micro SD / TF)</Typography>
      <Typography fontSize={15}>Made in China</Typography>
    </Box>
  )
}

export default Description
