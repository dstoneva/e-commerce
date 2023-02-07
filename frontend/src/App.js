import { BrowserRouter } from 'react-router-dom'
import Routes from 'Routes'
import { Store } from 'core'
import { CssBaseline } from '@mui/material'
import { InitialScrollToTop } from 'components'

const App = () => {
  return (
    <BrowserRouter>
      <Store>
        <InitialScrollToTop />
        <CssBaseline />
        <Routes />
      </Store>
    </BrowserRouter>
  )
}

export default App
