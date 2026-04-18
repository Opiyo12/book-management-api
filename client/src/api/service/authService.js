import apiInstance from "../apiInstance";
export const userLogin=async(username, password)=>{
const{data}= await apiInstance.post("https://localhost:3000/auth/login", {
    
        username, 
        password
    
});
    return data;
}

export const getCurrentUser=async()=>{
    const{data}=await apiInstance.get("");
    return data;
}
export const forgotPassword=async(email)=>{
 const{data}= await  apiInstance.post("",{email}); 

 return data;
}
