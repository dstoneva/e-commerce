import Loading from 'views/Loading'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from 'core'
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts'
import { PrivateRoute, PublicRoute } from 'components'

const HomeView = lazy(() => import('views/Home'))
const LoginView = lazy(() => import('views/Login'))
const NotFoundView = lazy(() => import('views/NotFound'))
const RegisterView = lazy(() => import('views/Register'))
const ProductDetailsView = lazy(() => import('views/ProductDetails'))
const CartView = lazy(() => import('views/Cart'))
const CheckoutView = lazy(() => import('views/Checkout'))
const OrderView = lazy(() => import('views/Order'))
const FavouritesView = lazy(() => import('views/Favourites'))

export const PageURLs = {
  Login: '/login',
  NotFound: '/404',
  Register: '/register',
  ProductDetails: '/products/:productId',
  Cart: '/cart',
  Checkout: '/checkout',
  Order: '/checkouts',
  Favourites: '/favourites'
}

const RoutesComponent = () => {
  const { isAuthenticated, loadingAuth } = useAuth()

  return !loadingAuth ? (
    <Suspense
      fallback={
        isAuthenticated ? (
          <MainLayout isSuspense={true} />
        ) : (
          <MinimalLayout isSuspense={true}>
            <Loading />
          </MinimalLayout>
        )
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <HomeView />
              </PrivateRoute>
            }
          />
          <Route
            path={PageURLs.ProductDetails}
            element={
              <PrivateRoute>
                <ProductDetailsView />
              </PrivateRoute>
            }
          />
          <Route
            path={PageURLs.Cart}
            element={
              <PrivateRoute>
                <CartView />
              </PrivateRoute>
            }
          />
          <Route
            path={PageURLs.Checkout}
            element={
              <PrivateRoute>
                <CheckoutView />
              </PrivateRoute>
            }
          />
          <Route
            path={`${PageURLs.Order}/:orderId`}
            element={
              <PrivateRoute>
                <OrderView />
              </PrivateRoute>
            }
          />
          <Route
            path={PageURLs.Favourites}
            element={
              <PrivateRoute>
                <FavouritesView />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundView />} />
        <Route path="/" element={<MinimalLayout />}>
          <Route
            path={PageURLs.Login}
            element={
              <PublicRoute>
                <LoginView />
              </PublicRoute>
            }
          />
          <Route
            path={PageURLs.Register}
            element={
              <PublicRoute>
                <RegisterView />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  ) : (
    ''
  )
}

export default RoutesComponent
