import { SnackbarProvider } from 'notistack'
import { AuthProvider, CartProvider, FavouritesProvider } from './contexts'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import theme from 'theme'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { API_URL } from 'config'

const fetcher = (url) => axios.get(`${API_URL}${url}`).then(({ data }) => data)

const Store = ({ children }) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1500} preventDuplicate>
        <SWRConfig value={{ fetcher }}>
          <AuthProvider>
            {/* <CategoriesProvider> */}
              <FavouritesProvider>
                <CartProvider>{children}</CartProvider>
              </FavouritesProvider>
            {/* </CategoriesProvider> */}
          </AuthProvider>
        </SWRConfig>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Store
