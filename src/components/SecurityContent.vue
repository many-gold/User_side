<template>
  <div>
    <!-- header section strats -->
    <TopNavBar/>
      <section class="fruit_section min-vh-100">
        <div class="container">
          <h2 class="custom_heading">Security Content</h2>
          <p class="custom_heading-text">
            <!-- {{securityContentData.headline}} -->
            <div v-html="securityContentData.headline"></div>
          </p>
          <template>
           
            <div class="row layout_padding2">
              <div class="col-md-6">
                <div class="fruit_detail-box">
                  <div class="row">
                    <div class="col-md-2" style="color: #f0ce0def; text-align:center">
                      <p class="mt-4" style="margin-bottom: 0px !important; text-align: center;">{{getDateFrom(securityContentData.createdat)}}</p>
                      <p style="text-align: center;font-size: 32px;text-transform: uppercase;margin-bottom: 0px !important;">{{getMonthFrom(securityContentData.createdat)}}</p>
                      <p class="mb-5">{{getYearFrom(securityContentData.createdat)}}</p>
                    </div>
                    <div class="col-md-10">
                      <p class="sub-heading mt-4 mb-4"> 
                       

                        {{securityContentData.subheading}}
                      </p>
                      <p class="mt-4 mb-4" style="text-align: justify">
                        {{securityContentData.details}}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" v-if="securityContentData.note !== ''">
                      <font-awesome-icon icon="fa-solid fa-circle-info" style="font-size: 25px; margin-right: 15px;" /> <span style="color: rgba(240, 206, 13, 0.937)">{{securityContentData.note}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex justify-content-center align-items-center">
                <div class="row">
                    <div class="col-md-6 mt-2"  v-for="(image, index) in securityContentData.images" :key="index">
                        <a v-if="image.imagelocation.includes('.pdf')" class="custom_dark-btn" title="Read Attached Document" style="color: #FFFFFF; display: flex; justify-content: center; align-items: center; height: 145px; border-radius: 50%; font-size: 70px;"  @click="viewImage(image.imagelocation)" >
                          <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                        </a>
			<a v-else-if="image.imagelocation.includes('.csv') || image.imagelocation.includes('.apk') || image.imagelocation.includes('.xlsx')|| image.imagelocation.includes('.ppt')|| image.imagelocation.includes('.pptx') || image.imagelocation.includes('.docx') || image.imagelocation.includes('.doc') || image.imagelocation.includes('.mp4')" class="custom_dark-btn" title="Download File" style="color: #FFFFFF; display: flex; justify-content: center; align-items: center; height: 58px; width: 200px; border-radius: 17%;font-size: 19px;font-weight: 600;" @click="viewImage(image.imagelocation)" >  
				Download here
				<font-awesome-icon icon="fa-solid fa-download" style="padding-left: 8px; font-size: 21px;" />
                        </a>
                        <img v-else :src="getImage(image.imagelocation)" @click="viewImage(image.imagelocation)" alt="" class="" width="250px" style="cursor: pointer;"/>
                    </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- footer section -->
      <Footer/>
      <!-- footer section -->

      <!-- end google map js -->
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import TopNavBar from './core/Navbar.vue'
import Footer from './core/Bottombar.vue'
import axios from 'axios'
export default {
   components: { 
      TopNavBar,
      Footer,
      VueEditor,
    },
  name: 'SecurityContent',
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
      image: "@/assets/background.png",
      securityContentData:{}
    };
  },
   mounted(){
    this.getSecurityContentByID()
  },
  methods:{
     getSecurityContentByID(){
            // this.operationID = this.$route.params.id;
            this.$store.dispatch('getSecurityContentByID', {ID: this.$route.params.id})
            .then(response =>{
            this.securityContentData = response.data.securityContentResult;
            console.log("ParamIDDD",this.$route.params.id)
console.log("DATASeyfe",response.data)

            })
            .catch(error =>{
                console.log(error);
console.log("ParamIDDDErr",this.$route.params.id)
console.log("DATASeyfErr",response.data)
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
      getImage(imagelocation){
        return `${axios.defaults.baseURL}/static/securityContents/${imagelocation}`;
      },
      viewImage(imagelocation){
        window.open(`${axios.defaults.baseURL}/static/securityContents/${imagelocation}`, '_blank');
      },
    computed: {
  formattedSubheading() {
    return this.securityContentData.subheading || "";
  }
}

  }
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
  .sub-heading{
      font-size: 20px;
      color: rgba(240, 206, 13, 0.937);
    }
    .fruit_section {
    margin-top: 5% !important;
  }
</style>
