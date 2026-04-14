import { axiosInstance } from "./axiosInstance";

//for login
export const loginUser=  async (credentials)=>{
    const res= await axiosInstance.post("/login",credentials,{ withCredentials: true});
   if (res.status === 200) {
       
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("userName", res.data.name);
         localStorage.setItem("userPhone", res.data.phone);
      }
   
      return res;
   
}


export const registerUser= async(formData)=>{
  return await axiosInstance.post("/newUsers",formData);
}


export const getCurrentUser = async () => {
const res = await axiosInstance.get("/auth/me", {
withCredentials: true,
});
return res.data;
};


export const logoutUser = async () => {
  return await axiosInstance.post("/logout"); // ⚠️ adjust if /auth/logout
};