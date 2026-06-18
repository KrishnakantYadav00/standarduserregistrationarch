function Home(){

const logout=()=>{

localStorage.removeItem("token");

window.location="/login";

}


return (

<div>

<h1>
Welcome to the Home page Dashboard
</h1>


<p>
This is a JWT protected area
</p>


<button onClick={logout}>
Logout
</button>


</div>

)

}


export default Home;