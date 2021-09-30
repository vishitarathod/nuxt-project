<template>
  <header>
    <nav>
      <h1>
        <nuxt-link to="/register">{{roles}}Home</nuxt-link>
      </h1>
      <ul>
        <li>
          <nuxt-link v-if="!isAuthenticated" to="/register">Register</nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="!isAuthenticated" to="/login">Login</nuxt-link>
        </li>
         <li>
         <nuxt-link v-if="isAuthenticated&&roles==='611fdcb36066bf93f57ed7f7'"  to="/users">Users</nuxt-link>
        </li>
         <li>
         <nuxt-link v-if="isAuthenticated&&roles==='611fdcb36066bf93f57ed7f7'" to="/post">Posts</nuxt-link>
        </li>
        <li>
         <!-- <nuxt-link v-if="!isLogout"  to="/logout">Logout</nuxt-link> -->
         <button v-if="!isLogout" @click.prevent="logout()">Logout</button>
         <!-- <TheHeader /> -->
        </li>
      </ul>
    </nav>
  </header>
</template>


<script>
import TheHeader from '~/components/TheHeader.vue'
export default {
  component:{
    TheHeader
  },
  data(){
    return{
      // roles:localStorage.getItem("roleId"),
      roles:  process.isClient ? !localStorage.getItem("roleId") : 'dssd',
      isAuthenticated: false
    }
  },
  mounted() {
    console.log(this.$store.state.logOut);
    if(localStorage.getItem("isAuthenticated")== "true") {
       this.isAuthenticated = true;
     this.$store.commit('setLogout',false)
    }
    else{
      this.isAuthenticated = false
      this.$store.commit('setLogout',true)
    }
  },
  watch:{
    isLogout(){
      this.isLogout=this.$store.state.logOut;
      if(this.isLogout) {
        this.isAuthenticated = false
      }
      else {
        this.isAuthenticated = true
      }
    }
  },
    computed: {
      isLogout(){
        return this.$store.state.logOut;
      }
  },
  //  created(){
     methods:{
       logout(){
          this.$store.dispatch('userLogout').then(async()=>{
       await this.$store.commit('setLogout',true)
        this.$router.push("/login")
     }
      );
       }
     }
    
  // },
}
</script>