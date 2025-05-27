import axios from "axios"
import { LoginCredentials } from "../types"

export const login = async (user:LoginCredentials)=>{
  const response  =  await axios.post('http://localhost:3000/api/login',user,{ withCredentials: true })

  console.log(response)
  return response?.data
}


export const getUser = async () => {
  const User = await axios.get("http://localhost:3000/api/user", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    },
  });
  return User;
};


export const logout = async () =>{
  const response = await axios.post('http://localhost:3000/api/logout',{}, { withCredentials: true })
  return response?.data
}
