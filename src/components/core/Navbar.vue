<template>
          <header class="header_section">
          <div class="container">
            <nav class="navbar navbar-expand-lg custom_nav-container pt-3">
              <router-link class="navbar-brand" to="/InformationPortal">
                <img :src="require('../../assets/images/Tsehay-Bank-logoNew.png')" alt="" />
              </router-link>
              <button @click="collapseDialog()" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" :style="show ? collapse : null" id="navbarSupportedContent">
                <div class="d-flex ml-auto flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                      <router-link class="nav-link" to="/InformationPortal">Home</router-link><div v-if="numNewNews > 0" class="nav-badge">{{numNewNews}}</div>
                        </div>
                       </li>
                  </ul>
                </div>
                <div class="quote_btn-container d-flex justify-content-right">
    <nav class="navbar">
    <ul class="nav-list">
  <li class="nav-item dropdown">
    <button class="dropdown-toggle">About Us</button>
    <ul class="dropdown-menu">
      <li><router-link to="/InformationPortal/organogram">Organogram</router-link></li>
      <!-- <li><a href="https://tsehaybank.com.et/company-profile/"  target="_blank">Company Profile</a></li>
      <li><a href="https://tsehaybank.com.et/organizational-structure/" target="_blank">Organizational Structure</a></li> -->
      
      </ul>
  </li>
</ul>

  </nav>
   </div>
                <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                      <router-link class="nav-link" to="/InformationPortal/departments">Policies and Procedures</router-link>
                      </div>
                     </li>
                  </ul>
                </div>
                <div class="quote_btn-container d-flex justify-content-right">
    <nav class="navbar">
    <ul class="nav-list">
  <li class="nav-item dropdown">
    <button class="dropdown-toggle">NBE</button>
    <ul class="dropdown-menu">
      <li><router-link :to="{ path: '/InformationPortal/nbeDirectives', query: { type: 'directive' } }">Directives</router-link></li>
      <li><router-link :to="{ path: '/InformationPortal/nbeDirectives', query: { type: 'proclamation' } }">Proclamations</router-link></li>
      <li><router-link :to="{ path: '/InformationPortal/nbeDirectives', query: { type: 'regulation' } }">Regulations</router-link></li>
      <li><router-link :to="{ path: '/InformationPortal/nbeDirectives', query: { type: 'guideline' } }">Guidelines</router-link></li>
      <li><router-link :to="{ path: '/InformationPortal/sanctionList', query: { type: 'guideline' } }">Sanction and Delinquent List</router-link></li>
    </ul>
  </li>
</ul>

  </nav>
   </div>
                <!-- <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                        <router-link class="nav-link" to="/InformationPortal/sanctionList">Sanction and Delinquent List</router-link><div v-if="numOfSanctionList > 0" class="nav-badge">{{numOfSanctionList}}</div>
                      </div>
                    </li>
                  </ul>
                </div> -->
		            <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                        <router-link class="nav-link" to="/InformationPortal/libraries">Resources</router-link><div v-if="numNewLibraries > 0" class="nav-badge">{{numNewLibraries}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                        <router-link class="nav-link" to="/InformationPortal/humanResource">Human Resource</router-link><div v-if="numOfHRPosts > 0" class="nav-badge">{{numOfHRPosts}}</div>
                      </div>
                    </li>
                  </ul>
                </div> -->
                <!-- <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                       
                        <router-link class="nav-link" to="/InformationPortal/InternalVacancy">Signature</router-link>
                      </div>
                    </li>
                  </ul>
                </div> -->
                 <!-- <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                        <router-link class="nav-link" to="/InformationPortal/SecuritySection">Cybersecurity Tips</router-link>
                      </div>
                    </li>
                  </ul>
                </div> -->
				<div class="quote_btn-container d-flex justify-content-right">
    <nav class="navbar">
    <ul class="nav-list">
      <li class="nav-item dropdown">
        <button class="dropdown-toggle">Media</button>
        <ul class="dropdown-menu">
          <!-- <li><a href="https://tsehaybank.com.et/latest-news/" title="Tsehay Bank  Latest News" class="nav-list" target="_blank">
            Latest News
                  </a></li> -->
          <li><router-link to="/InformationPortal/PhotoGallery" class="nav-list">Photo Gallery</router-link></li>
          <li><router-link to="/InformationPortal/VideoGallery" class="nav-list">Video Gallery</router-link></li>
          
        </ul>
      </li>
    </ul>
  </nav>
                </div>
                <div class="quote_btn-container d-flex justify-content-right">
    <nav class="navbar">
    <ul class="nav-list">
      <li class="nav-item dropdown">
        <button class="dropdown-toggle">Departments</button>
        <ul class="dropdown-menu">
          <!-- <li><router-link to="/InformationPortal/libraries">Libraries</router-link></li> -->
          <li><router-link to="/InformationPortal/humanResource">Human Resource</router-link></li>
          <!-- <li><router-link to="/InformationPortal/organogram">Organogram</router-link></li> -->
          <li><router-link to="/InformationPortal/SecuritySection">Cybersecurity Tips</router-link></li>
          <li><router-link to="/InformationPortal/Post">Discussion Forums </router-link></li>
          
        </ul>
      </li>
    </ul>
  </nav>
  </div>
  <div class="d-flex flex-column flex-lg-row align-items-right mr-3">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <div class="row">
                        <router-link class="nav-link" to="/InformationPortal/InternalVacancy">Vacancy</router-link><div v-if="numOfHRPosts > 0" class="nav-badge">{{numOfHRPosts}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="quote_btn-container d-flex justify-content-right">
                  <a href="http://localhost:1027/InformationPortal/login" target="_blank">
                    Login
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </header>
</template>

<script>
export default {
  data(){
    return {
        show:false,
        collapse: {
            display: "block",
        },
        numOfHRPosts: 0,
        numOfSanctionList: 0,
        numNewNews: 0,
        numNewLibraries: 0
    }
  },
  mounted(){
    this.getNotifications();
  },
  methods:{
    collapseDialog(){
      this.show = !this.show
    },
    getNotifications(){
       this.$store.dispatch('getNotifications')
        .then(response =>{
         this.numOfSanctionList = response.data.numNewSanctionList;
         this.numOfHRPosts = response.data.numNewHRPost;
         this.numNewNews = response.data.numNewNews;
        })
        .catch(error =>{
            console.log(error);
        });
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/bootstrap.css';
  @import '../../assets/css/responsive.css';
  @import '../../assets/css/style.css';
  .bell-icon{
    font-size: 13px;
    margin-left: -12px;
    background-color: rgb(240, 206, 13);
    width: 16px;
    height: 16px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
  }
  .nav-link{
    font-family: 'astoria' !important;
    font-size: 15px;
    font-weight: 600;
    z-index: 999999;
    }
  .nav-badge{
    width: 20px;
    text-align: center;
    height: 20px;
    background-color: #941400;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    position: relative;
    right: 20%;
    top: 8px;
    z-index: 9999;
    animation: scale 2s alternate infinite;
    font-weight:500;
  }
  .router-link-exact-active{
    color: rgb(240, 206, 13) !important;
  }
  @keyframes scale{
    0%{
      transform: scale(0 ,0);
    }
    50%{
      transform: scale(1, 1);
    }
    100%{
      transform: scale(0, 0);
    }
  }
  
   /* Basic styling */
.nav-list {
  z-index: 999999;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  

}



.dropdown {
  position: relative;
}

.dropdown-toggle {
  font-family: 'astoria' !important;
  background: none;
  border: none;
  font-size: 15px;
  color: #255b30;
  font-weight: 600;
  
}


.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  
  z-index: 1;
  min-width: 200px;
  border-radius: 5px;
  box-sizing: border-box;
  border-top: 1px solid #255b30;    /* Green top border */
  border-bottom: 1px solid #255b30; /* Green bottom border */
  border-left: 1px solid gold;    /* Yellow left border */
  border-right: 1px solid gold;   /* Yellow right border */
  color: #255b30;
  
}

.dropdown:hover .dropdown-menu {
  display: block;
}



.dropdown-menu li a {
  font-family: 'astoria' !important;
  background: none;
  font-size: 12px;
  color: #255b30;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  text-transform: none
}

.dropdown-menu li a:hover {
  color: rgb(240, 206, 13) !important;
  background-color: #255b30;
  width:100%;
}
.header_section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
}

</style>
