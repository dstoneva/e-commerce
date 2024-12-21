import { useEffect } from 'react'

const ScrollToTopOnMount = ({ dependencies }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [dependencies]) 

  return null
}

export default ScrollToTopOnMount
