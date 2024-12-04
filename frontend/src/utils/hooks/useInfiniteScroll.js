import { useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook to manage infinite scrolling.
 * @param {Function} callback - Function to call when the target element is visible.
 * @param {boolean} hasMore - Indicates if there are more items to load.
 * @param {boolean} loading - Indicates if data is currently being loaded.
 */
const useInfiniteScroll = (callback, hasMore, loading) => {
  const observerRef = useRef()

  const observerCallback = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        callback()
      }
    },
    [callback, hasMore, loading]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerRef.current)
      }
    }
  }, [observerCallback])

  return observerRef
}

export default useInfiniteScroll
