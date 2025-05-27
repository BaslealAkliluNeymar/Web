import axios from "axios"
import { LoginCredentials } from "../types"

export const login = async (user:LoginCredentials)=>{
  const response  =  await axios.post('https://web-server-vyw2.onrender.com/login',user,{ withCredentials: true })

  console.log(response)
  return response?.data
}


export const getUser = async () => {
  const User = await axios.get("https://web-server-vyw2.onrender.com/api/user", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    },
  });
  return User;
};


export const logout = async () =>{
  const response = await axios.post('https://web-server-vyw2.onrender.com/api/logout',{}, { withCredentials: true })
  return response?.data
}
