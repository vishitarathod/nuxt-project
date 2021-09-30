<template>
    <div>
  
     <h1 class="heading-center">Add Post</h1>
     <form class="lg-form">
       
    <label for="title"><b>Title</b></label>
     <input type="text" placeholder="Enter Title" name="title" id="title" v-model.trim="title" required>
      
    <label for="discription"><b>Discription</b></label>
    <input type="text" placeholder="Enter discription" name="discription" id="discription" v-model.trim="discription" required>

     <div class="form-group">
    <button class="btn btn-danger btn-block" @click.prevent="AddPost">Add Post</button>
      </div>
  
</form>
    </div>
</template>

<script>
import jwtInterceptor from '@/plugins/jwt.interceptor.js'
export default {
    data(){
        return{
            title:'',
            discription:'',
        }
    },
    methods:{
    //add post
    async AddPost(){
      this.$store.commit('setLoading',true)
     
      await jwtInterceptor.post('/addpost',{
        userId:localStorage.getItem("userId"),
        title:this.title,
        discription:this.discription,
      }).then((data)=>{
        console.log(data)
         this.$store.commit('setLoading',false)
        this.$router.push('/userpost')
      }).catch((e)=>{
        console.log(e)
       this.$store.commit('setLoading',false)
      })
      }
    }
}
</script>

