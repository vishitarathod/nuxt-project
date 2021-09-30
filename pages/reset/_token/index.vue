<template>
<div>
   <h1 class="heading-center">Reset Password</h1>
     <form class="lg-form">
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" v-model.trim="password" required>

     <label for="psw"><b>confirm Password</b></label>
    <input type="password" placeholder="Enter confirm Password" name="cpsw" id="cpsw" v-model.trim="cpassword" required>
   
     
    <!-- <button type="button" @click="reset" >Submit</button> -->
    <button @click="reset()">Reset Password</button>
  
</form>
</div>
</template>
<script>
import jwtInterceptor from '@/plugins/jwt.interceptor.js'
export default {
   
    data(){
        return{
            password:'',
            cpassword:'',
        }
    },
    methods:{
      //reset password
        async reset(){
          this.$store.commit('setLoading',true)
        jwtInterceptor.patch('/reset',{
        password:this.password,
        cpassword:this.cpassword,
        token:this.$route.params.token
      })
      .then((data)=>{
       this.$store.commit('setLoading',false)
        console.log(data)
        this.$router.push('/login')
      }).catch((error)=>{
       this.$store.commit('setLoading',false)
        console.log(error)
         console.log(error.response)
        this.error=error.response.data.error
      })
    }
    }
}

</script>