import Vuex from "vuex";
 
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

//create store
const createStore=()=>{
    return new Vuex.Store({
        state:{
            
                isLoading:false,
                loginApiStatus: "",
                logOut:false,
                registerProfile:{
                    name:'',
                    email:'',
                    password:'',
                    roleId:''
                
            }
        },
        // state: () => ({
        //     isLoading:false,
        //             loginApiStatus: "",
        //             logOut:false,
        //             registerProfile:{
        //                 name:'',
        //                 email:'',
        //                 password:'',
        //                 roleId:''
        //             }
        //   }),
        getters,
        mutations,
        actions
    })
}
export default createStore;
