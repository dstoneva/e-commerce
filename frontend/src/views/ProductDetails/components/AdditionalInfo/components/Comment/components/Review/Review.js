import { Box, Avatar, Typography, Rating } from '@mui/material'

const Review = ({ review }) => {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        my: 2,
        maxWidth: '600px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Avatar src={review.image} alt={review.author} sx={{ width: 48, height: 48 }} />
        <Box sx={{ ml: 1 }}>
          <Typography fontWeight={600}>{review.author}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={review.rating} size="small" readOnly />
            <Typography fontWeight={600} fontSize={14}>
              {review.rating}
            </Typography>
            <Typography fontSize={14}>{review.date}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography fontSize={14} color={(theme) => theme.palette.grey[600]}>
          {review.comment}
        </Typography>
      </Box>
    </Box>
  )
}

export default Review
