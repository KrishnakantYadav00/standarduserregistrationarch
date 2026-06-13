

import {createContext,useState,useEffect} from "react";
import api from "../api/axios";


export const ProductContext=createContext();



export const ProductProvider=({children})=>{


const [products,setProducts]=useState([]);



const fetchProducts=async()=>{

    const res=await api.get("/products");

    setProducts(res.data);

};



useEffect(()=>{

fetchProducts();

},[]);




const addProduct=async(product)=>{

const res=await api.post(
"/products",
product
);


setProducts([
...products,
res.data
]);


};



const deleteProduct=async(id)=>{


await api.delete(
`/products/${id}`
);


setProducts(
products.filter(
p=>p._id!==id
)
);


};




return (

<ProductContext.Provider

value={{
products,
fetchProducts,
addProduct,
deleteProduct
}}

>

{children}

</ProductContext.Provider>


);


};