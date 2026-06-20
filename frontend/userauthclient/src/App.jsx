import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Payments from "./pages/Payments";
function App(){

return (

<BrowserRouter>
<Navbar/>
<ToastContainer />
<Routes>
<Route
path="/products"
element={
<ProtectedRoute>
<Products/>
</ProtectedRoute>
}
/>
<Route
path="/products/:id"
element={
<ProtectedRoute>
<ProductDetails/>
</ProtectedRoute>
}
/>
<Route
path="/wishlist"
element={
<ProtectedRoute>
<Wishlist/>
</ProtectedRoute>
}
/>


<Route
path="/checkout"
element={
<ProtectedRoute>
<Checkout/>
</ProtectedRoute>
}
/>
<Route
path="/orders"
element={<Orders/>}
/>
<Route
path="/payments"
element={<Payments/>}
/>
<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/cart"
element={
<ProtectedRoute>
<Cart/>
</ProtectedRoute>
}
/>

<Route
path="/"
element={
<ProtectedRoute>
<Home/>
</ProtectedRoute>
}
/>


<Route
path="/product"
element={
<ProtectedRoute>
<Products/>
</ProtectedRoute>
}
/>


</Routes>

</BrowserRouter>

)

}


export default App;