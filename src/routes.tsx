import {
  createBrowserRouter,
  Outlet,
  useLocation,
  Navigate
} from "react-router-dom";
import Login from './views/login';
import Profile from "./views/profile";
import Products from './views/products'
import Cart from "./views/cart";
import Header from "./components/Header/Header";
import ProductDetail from "./views/products/detail";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/login' && <Header />}
      <Outlet />
    </>
  )
};

const ProtectedRouteIsLogin = () => {
  let auth = sessionStorage.getItem('username');
  return (
    auth ? <Outlet /> : <Navigate to="/login" />
  )
}

const ProtectedRouteIsNotLogin = () => {
  let auth = sessionStorage.getItem('username');
  return (
    !auth ? <Outlet /> : <Navigate to="/" />
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRouteIsNotLogin />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ]
      },
      {
        element: <ProtectedRouteIsLogin />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/",
            element: <Products />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/detail",
            element: <ProductDetail />,
          },
        ]
      }
      
    ]
  }
]);

export default router;