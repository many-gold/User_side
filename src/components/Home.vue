<template>
  <div>
  <div class="hero_area">
        <TopNavBar/>
        <div class="navmargin"></div>
        <Slider/>

        <!-- end slider section -->
      </div>
      <NewsSection/>
      <section class="contact_section layout_padding">
    <div class="container">
       <!-- <h2 class="custom_heading mb-5">Contact Us</h2> -->
      <div class="row">
        <div>
  <!-- Trigger Button -->
  <button @click="showPopup = true" class="fdbkpos">
    Give Us Your Feedback
  </button>

  <!-- Popup Modal -->
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <h5 class="font-weight-bold">Give Us Your Feedback</h5>
      <form @submit="addFeedback">
        <div class="contact_form-container">
          <div>
            <div>
              <input type="text" v-model="feedbackData.name" placeholder="Name">
            </div>
            <div class="mt-3">
              <input type="email" v-model="feedbackData.email" placeholder="Email">
            </div>
            <div class="mt-3">
              <textarea v-model="feedbackData.feedback" placeholder="Message Or Feedback" required></textarea>
            </div>
            <div class="mt-3 text-right">
              <button type="submit" class="btn btn-success mb-1">Send</button>
              <button type="button" class="btn btn-danger" @click="showPopup = false">Close</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

        <!-- <div class="col-md-3 pl-6 some-box">
           <div class="row layout_padding">
            <div class="col-md-12">
              <div class="row">
                  <h5 class="font-weight-bold">
                    Important Links
                  </h5>
              </div>
            </div>
            <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:1010/osTicket/" title="Tsehay Bank Help Desk" class="font-weight-bold-link" target="_blank">
                    TSB Help Desk
                  </a>
            </div>
            <div class="col-md-12 mb-2 links-imp" >
                  <a href="http://10.1.9.23:3001/static/userAccess/UserAccessRequest.pdf" title="User Access Request Form" class="font-weight-bold-link" target="_blank">
                    User Access Request Form
                  </a>
            </div>
	   <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:3001/static/userAccess/DocumentCheckingOnlineSystem.pdf" title="Document Authentication Access Request Form" class="font-weight-bold-link" target="_blank">
                    Document Authentication Access Request Form (DARA)
                  </a>
            </div>
	   <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:3001/static/userAccess/KYCAccessRequestForm.pdf" title="KYC Access Request Form" class="font-weight-bold-link" target="_blank">
                    KYC Access Request Form
                  </a>	
            </div>

	   <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:3001/static/userAccess/EmailResetRequestForm.pdf" title="Email Reset Request Form" class="font-weight-bold-link" target="_blank">
                    Email Reset Request Form
                  </a>
            </div>
	    <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:3001/static/userAccess/SmartVistaUserRequestForm.pdf" title="SmartVista User Access Request Form" class="font-weight-bold-link" target="_blank">
                    SmartVista User Access Request Form
                  </a>	
            </div>
	    <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:3001/static/userAccess/ZoomServiceUserGuide1.pdf" title="Zoom Service User Guide" class="font-weight-bold-link" target="_blank">
                    Zoom Service User Guide
                  </a>	
            </div>
 <div class="col-md-12 mb-2 links-imp">
                  <a href="http://10.1.9.23:3001/static/userAccess/AD_password_reset_form.pdf" title="AD Reset Form" class="font-weight-bold-link" target="_blank">
                    AD Password Reset Form
		  </a>	
            </div>

	    <div class="col-md-12 mb-2 links-imp">
                  <a href="https://fxonline.riaenvia.net/External/Login.aspx" title="RIA" class="font-weight-bold-link" target="_blank">
                    RIA
                  </a>	
            </div>
            <div class="row">
              <div class="col-md-6 ml-4" v-for="link in importantLinks" :key="link.link" style="width: 245px;">
                <div class="social_container">
                  <div class="social-box">
                    <div>
                      <a class="brandicons"  :href="link.link" :title="link.description" target="_blank" >
                          <font-awesome-icon icon="fa-solid fa-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row layout_padding">
            <div class="col-md-12">
              <div class="row">
                  <h5 class="font-weight-bold">
                    Follow Us
                  </h5>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="social_container">
                  <div class="social-box">
                    <a href="">
                      <font-awesome-icon class="brandicons" icon="fa-brands fa-facebook" />
                    </a>

                    <a href="">
                      <font-awesome-icon class="brandicons" icon="fa-brands fa-instagram" />
                    </a>
                    <a href="">
                      <font-awesome-icon class="brandicons" icon="fa-brands fa-twitter" />
                    </a>
                    <a href="">
                      <font-awesome-icon class="brandicons" icon="fa-brands fa-linkedin" />
                    </a>
                    <a href="">
                      <font-awesome-icon class="brandicons" icon="fa-brands fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        
      </div>
    </div>
  </section>
      <!-- footer section -->
      <Footer/>
      <!-- footer section -->

      <!-- end google map js -->
  </div>
</template>

<script>

import TopNavBar from './core/Navbar.vue'
import Footer from './core/Bottombar.vue'
import Slider from './core/Slider.vue'
import NewsSection from './core/NewsSection.vue'
import axios from 'axios'

export default {
   components: { 
      TopNavBar,
      Footer,
      Slider,
      NewsSection
    },
  name: 'Home',
  data() {
    return {
      image: "@/assets/background.png",
      newsData:[
      ],
      importantLinks:[

      ],
      items: [],
      showPopup: false,
      feedbackData: {
        name: '',
        email: '',
        feedback: ''
      }
    };
  },
  mounted(){
    // this.getAllNews();
    this.getAllImportantLinks();
  },
  methods:{
    routeTo(name, ID){
      this.$router.push({name: name, params: {id:ID}});
    },
     getAllNews(){
        this.$store.dispatch('getAllNews')
        .then(response =>{
        this.newsData = response.data.newsResult;
        console.log("news", response.data);
        })
        .catch(error =>{
            console.log(error);
        });
      },
      getAllImportantLinks(){
        this.$store.dispatch('getAllImportantLinks')
        .then(response =>{
          this.importantLinks = response.data.recordset;
        })
        .catch(error =>{
            console.log(error);
        });
      },
      addFeedback(){
        event.preventDefault();
        this.$store.dispatch('addFeedback', this.feedbackData)
        .then(response =>{
          this.feedbackData.name = '';
          this.feedbackData.email = '';
          this.feedbackData.feedback = '';
            this.$notify({
              title: 'Success',
              text: 'You have been successfully sent your feedback',
              type: 'success'
            })
        })
        .catch(error =>{
            console.log(error);
        });
      },
      getDateFrom(data){
        const temp = new Date(data);
        return temp.getDate()
      },
      getMonthFrom(data){
         const monthNames = ["JAN", "FEB", "MAR", "APR", "May", "JUN",
                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];
            const temp = new Date(data);

            return monthNames[temp.getMonth()];
      },
      getYearFrom(data){
        const temp = new Date(data);
        return temp.getFullYear();
      },
      countWords(word){
        var temp = word.split(" ");
        var concatenated = "";
        for(var i= 0; i<=50; i++){
          concatenated = temp[i] + " ";
        }
        console.log(concatenated);
      },
      getImage(imagelocation){
        if(`${axios.defaults.baseURL}/static/news/${imagelocation}`){
          return `${axios.defaults.baseURL}/static/news/${imagelocation}`;
        }
        return null;
      },
      viewImage(imagelocation){
        window.open(`${axios.defaults.baseURL}/static/news/${imagelocation}`, '_blank');
      }
  },
}
</script>

<style>
  @import '../assets/css/bootstrap.css';
  @import '../assets/css/responsive.css';
  @import '../assets/css/style.css';
  .custom_dark-btn:hover{
    color:rgb(37, 91, 48) !important;
  }
  .custom_dark-btn{
    color: #ffffff !important;
    cursor: pointer;
  }
  .brandicons{
    font-size: 30px;
    text-align: center;
    color: rgba(240, 206, 13, 0.937);
    margin-left: 15px;
  }
  .brandicons:hover{
    color: rgb(37, 91, 48);
    transition: .2s;
  }
  /* @media (max-width: 768px) {
       .hero_area {
            margin-bottom: 90px !important;
        }
        .some-box{
          padding-left: 30px !important;
        }
    } */
     
    .sub-heading{
      font-size: 21px;
      color: rgba(240, 206, 13, 0.937);
    }
    .font-weight-bold-link{
     	color: rgba(240, 206, 13, 0.937);
    	cursor: pointer;
    	font-size: 17px;
    	font-weight: 700;
    }
    .font-weight-bold-link:hover{
     	color: rgb(37, 91, 48);
    	transition: .2s;
    }
    .links-imp{
	border-bottom: 1px solid rgb(37, 91, 48);
     }
/* Popup Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Popup Content */
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

textarea {
  width: 100%;
  height: 80px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

input, button {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
}
.fdbkpos {
  display: flex;
  position: fixed;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: rgb(37, 91, 48);
  padding: 10px;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  /* z-index: 1000; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px; /* Adjust width as needed */
  height: 50px; /* Adjust height as needed */
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
   /* Optional: Add shadow for better visibility */
}
.navmargin{
    margin-top: 5%;
  }
/* .fdbkpos:hover {
  background-color: rgb(37, 91, 48);
  color: white;
  transition: 0.2s;
} */
</style>
