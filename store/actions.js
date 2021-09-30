// import axios from '@nuxtjs/axios'
import jwtInterceptor from '@/plugins/jwt.interceptor.js'
export default{
  async loginApi({commit}, payload) {
    try{
      console.log("payload.......",payload)
      const response = await jwtInterceptor
      .post("/auth/login",payload)
      console.log("================",response)
      if (response) {
        commit("setLoginApiStatus", true);
        localStorage.setItem("roleId",response.data.roles)
        localStorage.setItem("userId",response.data.userID)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("jwtaccesstoken",response.data.token)
        localStorage.setItem("jwtrefreshtoken",response.data.refreshToken)
      } else {
        commit("setLoginApiStatus", false);
        
      }
    }catch (error) {
      console.log(error.response)
        throw error
    }
   
    },

    async userLogout({commit}){
       localStorage.removeItem("isAuthenticated");
       localStorage.removeItem("jwtaccesstoken");
       localStorage.removeItem("jwtrefreshtoken");
       localStorage.removeItem("roleId");
       localStorage.removeItem("userId");
       commit("setLogout", false)
     },

     async registerApi(_, payload) {
      try {
          // console.log('before.....')
        const response = await jwtInterceptor
        .post("http://localhost:4000/signup",payload)
        console.log("+++++++++++",response)
        // console.log(response.data)
      } catch (error) {
        console.log(error.response)
          throw error
      }
    }
}