<template>
  <div>
    <h1 class="heading-center">Login</h1>  
    <form class="lg-form">
  <div>
    <label for="email">Email/Username</label>
    <input type="email" name="email" id="email" v-model.trim="email" required>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model.trim="password" required>
  </div>
  <p class="error" v-if="error!=''">{{error}}</p>
  
  <div class="router">
    <button @click.prevent="login()">Login</button>
   <!-- <button @click.prevent="login()">Login</button> -->
  </div>
  <div class="container">
    <p> <nuxt-link to="/forgot">forgot password?</nuxt-link></p>
  </div>
</form>
  <p>
    Don't have an account? <span><nuxt-link to="/register">Register</nuxt-link></span>
  </p>
</div>

</template>

<script>
export default {
     data() {
    return {
      email: "",
      password: "",
      error:""
    };
  },
 
  methods: {
    //login
    async login() {
      console.log('heyyy');
       this.$store.commit('setLoading',true)

      const payload = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('loginApi',payload)
     .then(async()=>{
       this.$store.commit('setLoading',false)
          const getRolesName=localStorage.getItem("roleId")
           console.log("get roles.........",getRolesName)
        this.$router.push("/register")
        console.log(this.$store.getters.getLoginApiStatus);
       if(this.$store.getters.getLoginApiStatus){
       await  this.$store.commit('setLoading',false)
        if(getRolesName==="611fdcb36066bf93f57ed7f7"){
            this.$router.push("/users")
        }else if(getRolesName==="611fdd2e6066bf93f57ed7f9"){
           this.$router.push("/users")
        }else{
          this.$router.push("/userpost")
        }
      }else{
        alert("failed")
      }
     }).catch((error)=>{
       this.$store.commit('setLoading',false)
        console.log("++++++++++++++++++")
        console.log(error.response)
        this.error=error.response.data.error
      })
     
    },
  },
}
</script>