import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: localStorage.getItem('access_token')|| null,
        messages: []
    },
    getters: {
        loggedIn(state) {
            return state.idToken != null;
        }
    },
    mutations: {
        retriveToken(state, token){
            state.idToken =  token;
        },
        logout(state){
            state.idToken = null;
        },
        SET_MESSAGES(state, messages) {
          state.messages = messages;
        }
    },
    actions: {
      logout({commit}){
        return new  Promise ((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('role')
            localStorage.removeItem('ID')
            delete axios.defaults.headers.common['Authorization']
            if(!localStorage.getItem('access_token')) resolve("successfully signed out")
            else reject("problem on destroying token");
        })
      },
      retriveToken(context, credentials){
        return new Promise((resolve, reject) =>{
          var formData = qs.stringify({
              'username': credentials.username,
              'password': credentials.password
          });
        axios.post('/users/login', formData)
          .then(response => {
            localStorage.setItem('access_token',  response.data.access_token);
            localStorage.setItem('role', response.data.recordset.role);
            localStorage.setItem('ID', response.data.recordset.ID);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            context.commit('retriveToken', response.data.access_token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      renewAccessToken(context){
        console.log("refresh Token accessed")
        return new Promise((resolve, reject) =>{
        axios.post('/users/renewAccessToken', { refresh_token: localStorage.getItem('refresh_token')})
          .then(response => {
            console.log(response);
            localStorage.setItem('access_token',  response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('role', 'roleChanged');
            context.commit('retriveToken', response.data.access_token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      addUser(context, credentials){
        return new Promise((resolve, reject) =>{
          var formData = qs.stringify(credentials);
        axios.post('/users/addUser', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      addFeedback(context, credentials){
        return new Promise((resolve, reject) =>{
          var formData = qs.stringify(credentials);
        axios.post('/users/addFeedback', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllBranchesForRegistration(context){
        return new Promise((resolve, reject)=>{
        axios.get('/branch/getAllBranchesForRegistration')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllUsers(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.post('/users/getAllUsers')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getUserByID(context, ID){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getUsersByID/'+ID)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getTotalUsers(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getTotalUsers')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getTotalNews(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getTotalNews')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getTotalSecurityContent(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getTotalSecurityContent')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getTotalOperations(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getTotalOperations')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getTotalPolicies(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getTotalPolicies')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getTotalProcedures(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getTotalProcedures')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllOperations(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllOperations')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      
      getAllImportantLinks(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllImportantLinks')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllNBEDirectives(context, type) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.idToken;
        return new Promise((resolve, reject) => {
          axios
            .get('/users/getAllNBEDirectives', { params: { type } }) // Pass 'type' here
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        });
      },
      getAllSanctions(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllSanctions')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllNews(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllNewsTest')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllSecurityContent(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllSecurityContent')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getNewsByID(context, credentials){
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
        axios.post('/users/getNewsByID', credentials)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getSecurityContentByID(context, credentials){
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
        axios.post('/users/getSecurityContentByID', credentials)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getOperationByID(context, credentials){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
        axios.post('/users/getOperationByID', credentials)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllPolicies(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllPolicies')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getPoliciesByID(context, credentials){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
        axios.post('/users/getPoliciesByID', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getProceduresByID(context, credentials){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
        axios.post('/users/getProceduresByID', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      downloadPolicy(context, credentials){
        console.log('here');
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
        axios.post('/users/downloadPolicy', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      downloadFile(context, credentials){
        return new Promise((resolve, reject)=>{
          var formData = qs.stringify(credentials);
          axios.post('/users/downloadPolicy', formData)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            })
          })
      },
      addOperations(context, credentials){
        return new Promise((resolve, reject) =>{
          var formData = qs.stringify(credentials);
        axios.post('/users/addOperations', formData)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      addPolicy(context, file){
        return new Promise((resolve, reject) =>{
          const formData = new FormData();
          formData.append("file", file);
          // formData.append("title", credentials.title)
          console.log(formData);
        axios.post('/users/addPolicies', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      downloadPolicy(context, file){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/downloadPolicy')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      editUser(context, credentials){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.post('/users/editUsers', credentials)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      changeUserStatus(context, credentials){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.post('/users/changeUserStatus', credentials)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getHRPosts(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getHRPosts')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getAllAnnouncements(context){
        return new Promise((resolve, reject)=>{
          axios.get('/users/getAllAnnouncements')
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            })
        })
      },
      getNotifications(context){
        return new Promise((resolve, reject)=>{
          axios.get('/users/getNotifications')
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            })
        })
      },
      getLibraries(context){
        return new Promise((resolve, reject)=>{
        axios.get('/users/getLibraries')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      getOrganogram(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getOrganogram')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
	   //Photo Gallery
      getAllPhotoGallery(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllPhotoGallery')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      //Video Gallery
      getAllVideoGallery(context){
        // axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.idToken
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllVideoGallery')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      //Important link
      getAllImportantLinksfront(context){
        
        return new Promise((resolve, reject)=>{
        axios.get('/users/getAllImportantLinks')
          .then(response => {
            resolve(response);
            console.log('Response Data:', response.data);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
     // Add other actions here...
    getReplies({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('/users/messages')
          .then((response) => {
            commit('SET_MESSAGES', response.data.recordset);
            resolve(response.data);
          })
          .catch((error) => {
            console.error('Error fetching replies:', error);
            reject(error);
          });
      });
    },
    submitMessage(context, credentials) {
      return new Promise((resolve, reject) => {
        const formData = qs.stringify(credentials);
        axios
          .post('/users/messages', formData)
          .then((response) => {
            context.commit('ADD_MESSAGE', response.data);
            resolve(response);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
     //Important link
     getAllImportantLinksfront(context){
        
      return new Promise((resolve, reject)=>{
      axios.get('/users/getAllImportantLinks')
        .then(response => {
          resolve(response);
          console.log('Response Data:', response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    //PhoneDirectory link
    getAllphonedirectory(context){
        
      return new Promise((resolve, reject)=>{
      axios.get('/phone/getAllphonedirectory')
        .then(response => {
          resolve(response);
          console.log('Response Data:', response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },

        //PhoneDirectory link
        getAllVacancy(context){
        
          return new Promise((resolve, reject)=>{
          axios.get('/vacancy/getAllVacancy')
            .then(response => {
              resolve(response);
              console.log('Response Data:', response.data);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            })
          })
        },

    }
});

