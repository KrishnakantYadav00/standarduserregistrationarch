import {useState} from "react";
import api from "../api/axios";


function Register(){


const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const submitHandler=async(e)=>{

e.preventDefault();


try{


await api.post(
"/auth/register",
form
);


alert("Registered");



}

catch(err){

alert(
err.response?.data || "Error"
);

}


}



return (

<div>

<h1>Register</h1>


<form onSubmit={submitHandler}>


<input
placeholder="Name"
onChange={
e=>setForm({
...form,
name:e.target.value
})
}
/>



<input
placeholder="Email"
onChange={
e=>setForm({
...form,
email:e.target.value
})
}
/>



<input
type="password"
placeholder="Password"
onChange={
e=>setForm({
...form,
password:e.target.value
})
}
/>



<button>

Create Account

</button>


</form>


</div>

)


}


export default Register;