import {useEffect,useState} from "react";

import {
getOrders,
cancelOrder
}
from "../api/orderApi";



function Orders(){

const [orders,setOrders]=useState([]);


const loadOrders = async()=>{

const res = await getOrders();

setOrders(res.data);

};


useEffect(()=>{

loadOrders();

},[]);



const handleCancel = async(id)=>{

await cancelOrder(id);

loadOrders();

};



return(

<div>

<h1>Order History</h1>

{

orders.map(order=>(

<div
key={order._id}
style={{
border:"1px solid gray",
padding:"10px",
margin:"10px"
}}
>

<h3>

Order ID:

{order._id}

</h3>

<p>

Status:

{order.status}

</p>

<p>

Total:

₹{order.totalAmount}

</p>

<button
onClick={()=>
handleCancel(order._id)
}
>

Cancel Order

</button>

</div>

))

}

</div>

);

}


export default Orders;