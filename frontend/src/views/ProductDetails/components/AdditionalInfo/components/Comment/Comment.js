import { useState } from 'react'
import { Typography, Box, Button, TextField, Rating } from '@mui/material'
import { Review } from './components'
import { useAuth } from 'core'
import axios from 'axios'
import { API_URL } from 'config'

export default function Comment({ reviews, productId }) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [posts, setPosts] = useState(
    reviews.map((review) => ({
      author: review.reviewerName,
      date: new Date(review.date).toLocaleString(),
      comment: review.comment,
      rating: review.rating,
    }))
  )

  const handleRatingChange = (event) => {
    const rate = Number(event.target.value)
    setRating(rate)
  }

  const handleCommentChange = (event) => {
    const val = event.target.value
    setComment(val)
  }

  const doSubmit = async () => {
    const newComment = {
      rating,
      comment,
      reviewerName: user.name,
      reviewerEmail: user.email,
    }

    try {
      // Send the new comment to the backend
      const response = await axios.post(`${API_URL}/products/${productId}/comment`, newComment)

      if (response.status === 200) {
        // Update the local state with the new comment
        setPosts((prevPosts) => [
          ...prevPosts,
          {
            author: newComment.reviewerName,
            date: new Date().toLocaleString(), // Current time for the new comment
            comment: newComment.comment,
            rating: newComment.rating,
          },
        ])
        setRating(0)
        setComment('')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <>
      {posts.map((post, index) => (
        <Review review={post} key={`post-${index}`} />
      ))}

      <Box display="flex" alignItems="flex-start" flexDirection="column" marginTop={3}>
        <Typography variant="h5" fontWeight={600}>
          Write a Review for this product
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box display="flex" gap={1} sx={{ my: 2 }}>
            <Typography fontWeight={600}>Your Rating</Typography>
            <Typography fontWeight={600} color="primary">
              *
            </Typography>
          </Box>
        </Box>
        <Rating value={rating} onChange={handleRatingChange} />
      </Box>

      <Box component="form" autoComplete="off">
        <Box>
          <Box display="flex" gap={1} sx={{ my: 2 }}>
            <Typography fontWeight={600}>Your Review</Typography>
            <Typography fontWeight={600} color="primary">
              *
            </Typography>
          </Box>

          <TextField
            fullWidth
            required
            size="small"
            id="outlined-multiline-static"
            placeholder="Write a review here..."
            multiline
            rows={8}
            value={comment}
            onChange={handleCommentChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Button disabled={comment.trim() === '' || rating === 0} onClick={doSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </>
  )
}
