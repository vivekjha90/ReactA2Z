import { axiosInstance } from "./axiosInstance";

export const bookAppointments= async(payload)=>{
    const url ="/api/appointments/book";
    const res= await axiosInstance.post(url,payload);
    return res;
}
