import {useState} from "react";
import api from "../api/axios";


function Login(){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const submitHandler=async(e)=>{

e.preventDefault();


try{

const res =
await api.post(
"/auth/login",
{
email,
password
}
);


localStorage.setItem(
"token",
res.data.token
);


alert("Login successful");


}
catch(err){

alert(
err.response?.data || "Login failed"
);

}

}



return (

<div>

<h1>Login</h1>


<form onSubmit={submitHandler}>


<input

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>


<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>


<button>

Login

</button>


</form>


</div>

)


}


export default Login;