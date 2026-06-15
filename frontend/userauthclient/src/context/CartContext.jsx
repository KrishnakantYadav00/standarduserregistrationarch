import { createContext,useState } from "react";
import axios from "axios";

export const CartContext=createContext();


export function CartProvider({children}){

const [cart,setCart]=useState([]);


const fetchCart=async()=>{

const res=await axios.get(
"http://localhost:5000/api/cart"
);

setCart(res.data);

};


const addToCart=async(product)=>{

await axios.post(
"http://localhost:5000/api/cart",
{
 product:product._id,
 quantity:1
}
);

fetchCart();

};


const removeFromCart=async(id)=>{

await axios.delete(
`http://localhost:5000/api/cart/${id}`
);

fetchCart();

};


const updateQuantity=async(id,quantity)=>{

await axios.put(
`http://localhost:5000/api/cart/${id}`,
{
 quantity
}
);

fetchCart();

};


return (

<CartContext.Provider
value={{
cart,
fetchCart,
addToCart,
removeFromCart,
updateQuantity
}}
>

{children}

</CartContext.Provider>

)

}