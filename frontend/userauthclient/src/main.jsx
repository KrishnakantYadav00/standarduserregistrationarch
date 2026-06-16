import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {ProductProvider} from "./context/productContext";
import { CartProvider } from "./context/CartContext.jsx";


ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

<CartProvider>

<ProductProvider>

<App/>

</ProductProvider>

</CartProvider>


);