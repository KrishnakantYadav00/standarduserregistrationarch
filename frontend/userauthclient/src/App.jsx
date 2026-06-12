import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";


function App(){

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login/>}
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

path="/home"

element={

<ProtectedRoute>

<Home/>

</ProtectedRoute>

}

/>


</Routes>


</BrowserRouter>

)

}


export default App;