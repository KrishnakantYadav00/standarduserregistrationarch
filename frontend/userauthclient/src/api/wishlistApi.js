import axios from "axios";


const API = "http://localhost:5000/api/wishlist";


const getConfig = () => ({
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
});



export const addWishlist = (productId)=>{

return axios.post(
`${API}/add`,
{
productId
},
getConfig()
);

};



export const getWishlist = ()=>{

return axios.get(
API,
getConfig()
);

};



export const removeWishlist = (productId)=>{

return axios.delete(
`${API}/remove`,
{
data:{
productId
},
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);

};