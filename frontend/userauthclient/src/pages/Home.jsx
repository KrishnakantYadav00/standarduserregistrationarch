function Home(){

const logout=()=>{

localStorage.removeItem("token");

window.location="/login";

}


return (

<div>

<h1>
Dashboard
</h1>


<p>
JWT protected area
</p>


<button onClick={logout}>
Logout
</button>


</div>

)

}


export default Home;