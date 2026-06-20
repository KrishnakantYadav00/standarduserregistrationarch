import {useState,useEffect} from "react";
import {getPayments} from "../api/paymentApi";

function Payments(){

const [payments,setPayments]=useState([]);


useEffect(()=>{

const fetch=async()=>{

try{

const res=await getPayments();
setPayments(res.data);

}
catch(err){
console.log(err);
}

};

fetch();

},[]);


return (

<div>

<h1>Payment History</h1>


{payments.length===0 ? (
<p>No payments found.</p>
) : (

payments.map(p=>(

<div
key={p._id}
className="product-card"
>

<p>
<strong>Payment ID:</strong>{" "}
{p.paymentId}
</p>

<p>
<strong>Amount:</strong>{" "}
₹{p.amount}
</p>

<p>
<strong>Status:</strong>{" "}
<span style={{
color:
p.status==="Success"
? "green"
: p.status==="Failed"
? "red"
: "orange"
}}>
{p.status}
</span>
</p>

<p>
<strong>Date:</strong>{" "}
{new Date(p.createdAt)
.toLocaleDateString()}
</p>

</div>

))

)}

</div>

)

}


export default Payments;
