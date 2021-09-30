<template>
    <div>
        <h1 class="heading-center">Add User</h1>
     <form class="lg-form">
          
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>

                <div class="form-group">
                    <!-- <button class="btn btn-danger btn-block">Add</button> -->
                    <button @click.prevent="handleAddUserForm()">Add</button>
                </div>
            </form>
        </div>
 
</template>

<script>
import jwtInterceptor from '@/plugins/jwt.interceptor.js'
export default {
    data() {
        return {
            user: { 
                name:'',
                email:'',
                password:'',
                roles:'611fdd096066bf93f57ed7f8'
            }
        }
    },
    methods: {
        //add user
        handleAddUserForm() {
           this.$store.commit('setLoading',true)
         
            let apiURL = `/add-user`;
            jwtInterceptor.post(apiURL, this.user).then((res) => { 
                console.log("+++++++++++++",res)
                this.$store.commit('setLoading',false)
                   this.$router.push('/users')
            }).catch(error => {
                console.log(error)
                this.$store.commit('setLoading',false)
            });
        }
    }
}
</script>