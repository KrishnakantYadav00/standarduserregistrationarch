import api from "./axios";


export const createPayment=(orderId,amount)=>{

return api.post(
"/payments/create",
{
orderId,
amount
}
);

};


export const verifyPayment=(id,status)=>{

return api.put(
`/payments/verify/${id}`,
{
status
}
);

};


export const getPayments=()=>{

return api.get("/payments");

};
