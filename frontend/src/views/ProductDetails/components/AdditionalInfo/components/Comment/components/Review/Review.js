import { Box, Avatar, Typography, Rating, Tooltip } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

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
            <Typography fontWeight={600} fontSize={14} color="primary">
              {review.rating}
            </Typography>
            <Tooltip title={review.date} placement="top" arrow>
              <Typography fontSize={14} color="text.secondary" sx={{ cursor: 'pointer' }}>
                {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
              </Typography>
            </Tooltip>
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
