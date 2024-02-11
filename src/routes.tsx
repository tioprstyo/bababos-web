import {
  createBrowserRouter,
  Outlet,
  useLocation
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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
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
]);

export default router;