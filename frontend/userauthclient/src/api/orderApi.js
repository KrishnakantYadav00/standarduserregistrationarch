import axios from "axios";

const API = "http://localhost:5000/api/orders";

export const placeOrder = () => {

return axios.post(API);

};


export const getOrders = () => {

return axios.get(API);

};


export const cancelOrder = (id) => {

return axios.put(
`${API}/cancel/${id}`
);

};