import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";

import ProtectedRoute from "./components/ProtectedRoute";


function App(){

return (

<BrowserRouter>

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
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
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