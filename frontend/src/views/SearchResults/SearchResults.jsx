import React, { useState, useEffect, useRef } from 'react'
import { Box, Grid, Typography, CircularProgress, Container } from '@mui/material'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ProductCard } from 'components'
import { API_URL } from 'config'

const SearchResults = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')?.trim() || ''

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const observerRef = useRef()

  const fetchProducts = async (currentPage) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API_URL}/products`, {
        params: { page: currentPage, productsPerPage: 8, search: query },
      })

      setProducts((prevProducts) => (currentPage === 1 ? data.result : [...prevProducts, ...data.result]))

      setHasMore(data.pages > currentPage)
      setTotal(data.total)
      setPage(currentPage + 1)
    } catch (error) {
      console.error('Error fetching products:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)

    if (query) fetchProducts(1)
  }, [query])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchProducts(page)
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, loading, page])

  if (!query) {
    return (
      <Container sx={{ py: 4, px: 6, minHeight: '60vh', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Start typing to search for products
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discover amazing items, trending searches, and more.
        </Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4, px: 6, minHeight: '60vh' }}>
      <Typography variant="h4" gutterBottom>{`Search Results for: "${query.slice(0, 50)}"`}</Typography>
      {total === 0 && !loading && (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 4, textAlign: 'center' }}>
          No results found for your search. Please try a different query.
        </Typography>
      )}

      {products.length > 0 && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          {`Showing ${products.length} of ${total} results`}
        </Typography>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={product._id}>
            <ProductCard quickView product={product} />
          </Grid>
        ))}
      </Grid>

      <Box
        ref={observerRef}
        sx={{
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && <CircularProgress />}
      </Box>
    </Container>
  )
}

export default SearchResults
