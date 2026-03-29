import { axiosInstance } from "./axiosInstance";


//analytics api calling
export const analytics= async()=>{
    const url= "/api/analytics/service-stats";
    const res=await axiosInstance.get(url);
    return res;
}

//reminder api calling
export const reminder= async()=>{
    const url ="/api/visitors/reminders";
    const res= await axiosInstance.get(url);
    return res;
}


//services api calling
//1. fetchServices
export const getAllServices= async()=>{
const url= "/api/services";
 const res=await axiosInstance.get(url);
 return res;
}

//2.createServices
export const createService= async (formData)=>{
 const url= "/api/services";
 const res= await axiosInstance.post(url,formData);
 return res;
}

//3. updateServices
export const updateServices= async(id,formData)=>{
    const url= `/api/services/${id}`;
    const res=await axiosInstance.put(url,formData);
    return res;
}

//4.deleteServices
export const deleteService= async(id)=>{
    const url= `/api/services/${id}`;
    const res= await axiosInstance.delete(url)
}


//specialist Api calling
//1. getSpecialist 
export const getAllSpecialist= async()=>{
    const url= "/api/specialists";
    const res= await axiosInstance.get(url);

    return res;
}

//2. createSpecialist
export const createSpecialist= async(formData)=>{
    const url= "/api/specialists";
    const res= await axiosInstance.post(url,formData);
    return res;
}

//3. updateSpecialist
export const updateSpecialist= async (id,formData)=>{
    const url= `/api/specialists/${id}`;
    const res= await axiosInstance.put(url,formData);
    return res;
}

//4. deleteSpecilaist
export const deleteSpecialist= async(id)=>{
    const url =`/api/specialists/${id}`;
    const res=await  axiosInstance.delete(url);
}

//staff Api calling
//1. getAllStaff
export const getAllStaff= async()=>{
    const url= "/staff";
    const res= await axiosInstance.get(url);
    return res;
}

//2. createStaff
export const createStaff=async(formData)=>{
    const url= "/addStaff";
    const res= await axiosInstance.post(url,formData);
    return res;
}

//3. updateStaff
export const updateStaff= async(id,formData)=>{
    const url= `/staff/${id}`;
    const res= await axiosInstance.put(url,formData);
    return res;
}

//4.deleteStaff
export const deleteStaff= async(id)=>{
    const url=`/staff/${id}`;
    const res=await axiosInstance.delete(url);
}


//visitor Api calling
//1. getAllVisitor
export const getAllVisitor= async()=>{
    const url= "/api/visitors";
    const res= await axiosInstance.get(url);
    return res;
}

//2. createVisitor
export const createVisitor=async(formData)=>{
    const url= "/api/visitors";
    const res= await axiosInstance.post(url,formData);
    return res;
}

//3. updateVisitor
export const updateVisitor= async(id,formData)=>{
    const url= `/api/visitors/${id}`;
    const res= await axiosInstance.put(url,formData);
    return res;
}

//4.deleteVisitor
export const deleteVisitor= async(id)=>{
    const url=`/api/visitors/${id}`;
    const res=await axiosInstance.delete(url);
}
