import Home from "./pages/home/Home";
import Root from "./pages/Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// @ts-ignore
import Cart from "./pages/Cart/Cart";

import NotFound from "./pages/NotFound";
import DetailsProducts from "./pages/details/details_products";
import Signin from "./sign/Signin";
import Signup from "./sign/Signup";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="details_products/:stringid" element={<DetailsProducts />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
