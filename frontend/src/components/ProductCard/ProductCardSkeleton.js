import { Card, CardActions, CardContent, Skeleton, Box } from '@mui/material'

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        margin: 1,
        position: 'relative',
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        height={300}
        sx={{
          width: '100%',
          borderRadius: 1,
        }}
      />
      
      <Box display="flex" p={2}>
        <CardContent sx={{ width: '100%', p: 0 }}>
          {/* Title Skeleton */}
          <Skeleton variant="text" height={30} width="80%" sx={{ mb: 1 }} />

          {/* Rating Skeleton */}
          <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />

          {/* Price Skeleton */}
          <Skeleton variant="text" height={25} width="40%" />
        </CardContent>
        
        <CardActions
          sx={{ width: 30, p: 0, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}
        >
          {/* Button Skeletons */}
          <Skeleton variant="circular" width={30} height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={20} height={20} />
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProductCardSkeleton
