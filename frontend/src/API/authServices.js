import { axiosInstance } from "./axiosInstance";

//for login
export const loginUser= async (credentials)=>{
    const res= await axiosInstance.post("/login",credentials);
   if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("userName", res.data.name);
       
      }
   
      return res;
   
}

//for Signup
export const registerUser= async(formData)=>{
  return await axiosInstance.post("/newUsers",formData);
}