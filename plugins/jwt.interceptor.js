import axios from "axios";
// import Vue from 'vue';
// export default function ({ $axios }, inject) {
const jwtInterceptor = axios.create({
  baseURL: 'http://localhost:4000',
});
console.log(jwtInterceptor)
jwtInterceptor.interceptors.request.use((config) => {
  const authToken=localStorage.getItem("jwtaccesstoken")
  if (authToken) {
  config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
 
jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.response.config;
    //if any error while generating refresh token
    if (originalRequest.url === `http://localhost:4000/refresh-token`) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("jwtaccesstoken");
      localStorage.removeItem("jwtrefreshtoken");
      localStorage.removeItem("roleId");
      localStorage.removeItem("userId");
      return Promise.reject(error);
      }
      
    if (error.response.status === 401&& !originalRequest._retry) {
      originalRequest._retry = true;
      var token=localStorage.getItem("jwtrefreshtoken")

    return jwtInterceptor
     .post("/refresh-token",{token})
     .then((res)=> {
       console.log(res.data)
      localStorage.setItem("jwtaccesstoken",res.data.accToken)
      localStorage.setItem("jwtrefreshtoken",res.data.refToken)
      return jwtInterceptor(originalRequest);
     }  
     );
    }else if(error.response.status === 401&& originalRequest._retry){
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("jwtaccesstoken");
      localStorage.removeItem("jwtrefreshtoken");
      localStorage.removeItem("roleId");
      localStorage.removeItem("userId");
      return Promise.reject(error);
    }
     else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;