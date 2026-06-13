import {useState,useContext} from "react";
import {ProductContext} from "../context/productContext";


function ProductForm(){

const {addProduct}=useContext(ProductContext);

const [form,setForm]=useState({
name:"",
description:"",
price:"",
category:"",
stock:""
});


const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


const handleSubmit=async(e)=>{
e.preventDefault();
await addProduct(form);
setForm({name:"",description:"",price:"",category:"",stock:""});
};


return (

<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
/>

<input
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>

<input
name="price"
type="number"
placeholder="Price"
value={form.price}
onChange={handleChange}
/>

<input
name="category"
placeholder="Category"
value={form.category}
onChange={handleChange}
/>

<input
name="stock"
type="number"
placeholder="Stock"
value={form.stock}
onChange={handleChange}
/>

<button type="submit">Add Product</button>

</form>

)

}


export default ProductForm;
