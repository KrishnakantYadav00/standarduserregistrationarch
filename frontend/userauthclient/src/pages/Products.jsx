import {useContext,useEffect,useState} from "react";
import {ProductContext} from "../context/productContext";
import ProductForm from "../components/productform";
import ProductCard from "../components/productcard";

function Products(){

const {products,fetchProducts}=useContext(ProductContext);

const [search,setSearch]=useState("");
const [category,setCategory]=useState("All");


useEffect(()=>{
    fetchProducts();
},[]);


const filteredProducts=(products || []).filter(product=>
    product.name.toLowerCase().includes(search.toLowerCase())
).filter(p=>
    category==="All" || p.category===category
);


return (

<div>

<h1>Products</h1>

<ProductForm/>

<input
placeholder="Search product"
onChange={(e)=>setSearch(e.target.value)}
/>

<select onChange={(e)=>setCategory(e.target.value)}>
<option>All</option>
<option>Electronics</option>
<option>Fashion</option>
</select>

{
filteredProducts.map((p)=>(

<ProductCard
key={p._id}
product={p}
/>

))
}


</div>

)

}


export default Products;