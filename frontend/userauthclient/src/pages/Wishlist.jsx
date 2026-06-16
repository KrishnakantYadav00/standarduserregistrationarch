import {useEffect,useState}
from "react";

import {toast} from "react-toastify";

import {
getWishlist,
removeWishlist
}
from "../api/wishlistApi";



function Wishlist(){


const [wishlist,setWishlist]=useState([]);



useEffect(()=>{


load();


},[])



const load=async()=>{


const res=
await getWishlist();


setWishlist(
res.data.products
);


}



const remove=async(id)=>{

try{

await removeWishlist(id);

toast.success("Removed from Wishlist 🗑️");

load();

}
catch(error){

toast.error("Failed to remove from Wishlist");

}

}



return (

<div>


<h1>
My Wishlist
</h1>


{
wishlist.map(item=>(

<div key={item._id}>


<h3>
{item.name}
</h3>


<button
onClick={()=>remove(item._id)}
>

Remove

</button>


</div>

))

}


</div>

)

}


export default Wishlist;