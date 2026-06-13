const ProductCard=({product})=>{


return (

<div>

<h3>{product.name}</h3>

<p>{product.description}</p>

<p>
₹{product.price}
</p>

<p>
{product.category}
</p>

<p>
Stock: {product.stock}
</p>


</div>

)


}


export default ProductCard;