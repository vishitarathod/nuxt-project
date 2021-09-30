<template>
      <div>
          <h1 class="heading-center">Update Post</h1>
       <form class="lg-form">
    
    <label for="title"><b>Title</b></label>
    <input type="text" v-model="post.title" required>

    <label for="discription"><b>Discription</b></label>
    <input type="text" v-model="post.discription" required>

    <!-- <button type="button"  @click="handleUpdateForm()">Update</button> -->
    <button @click.prevent="handleUpdateForm()">Update</button>
</form>

  </div>
</template>

<script>
import jwtInterceptor from '@/plugins/jwt.interceptor.js'
export default {
    data() {
        return {
            post: { 
                title:'',
                discription:'',
            }
        }
    },
    //get post which we have to edit
    created() {
        let apiURL = `/edit-post/${this.$route.params.id}`;

        jwtInterceptor.get(apiURL).then((res) => {
            this.post = res.data;
            console.log(this.post)
        })
    }, 
    methods: {
        //update post
        handleUpdateForm() {
             this.$store.commit('setLoading',true)
            let apiURL = `/update-post/${this.$route.params.id}`;
             
            jwtInterceptor.put(apiURL, this.post).then((res) => {
                console.log(res)
            this.$store.commit('setLoading',false)
               this.$router.push('/userpost')
            }).catch(error => {
               this.$store.commit('setLoading',false)
                console.log(error)
            });
        }
    }
}
</script>
