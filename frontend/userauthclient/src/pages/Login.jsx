import {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";


function Login(){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const { login } = useContext(AuthContext);
const navigate = useNavigate();



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


login(res.data.token);


alert("Login successful");

navigate("/");


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