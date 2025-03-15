<template>
  <div>
 <TopNavBar/>

  <section class="fruit_section layout_padding min-vh-100">
        <div class="container">
          <h2 class="custom_heading mt-3 collapse-help-title">Cybersecurity Tips by TSB ITSS <span style="font-weight: 400;font-size: 18px;">{{filterTable.length}} Documents</span></h2>
          <template  v-if="loading == false ">
          <div class="row" style="display: flex; align-items: center; justify-content: center; text-align: center;">
                    <input type="search" v-model="filter" placeholder="Search" style="border: none;outline: none; border-bottom: 0.8px solid rgb(37, 91, 48);width: 20%;margin: 10px 0; text-align: center; color: rgb(37, 91, 48);">
              </div>
            <div class="row layout_padding2" style="border-bottom: .8px solid rgba(240, 206, 13, 0.937);"  v-for="(securityContent, index) in filterTable" :key="index">
              <div class="col-md-8">
                <div class="fruit_detail-box">
                  <h3>
                    <!-- {{securityContent.headline}} -->
                    <div v-html="securityContent.headline"></div>
                  </h3>
                  <div class="row">
                    <div class="col-md-2" style="color: #f0ce0def; text-align:center">
                      <p class="mt-4" style="margin-bottom: 0px !important; text-align: center;">{{getDateFrom(securityContent.createdat)}}</p>
                      <p style="text-align: center;font-size: 32px;text-transform: uppercase;margin-bottom: 0px !important;">{{getMonthFrom(securityContent.createdat)}}</p>
                      <p class="mb-5">{{getYearFrom(securityContent.createdat)}}</p>
                    </div>
                    <div class="col-md-10">
                      <p class="mt-2 mb-2 sub-heading">
                        <div v-html="securityContent.subheading"></div>
                        <!-- {{securityContent.subheading}} -->
                      </p>
                      <p style="text-align: justify">
                        {{ securityContent.details ? securityContent.details.substring(0,310) : '' }}
                       </p>

                    </div>
                  </div>
                  <div style="display: flex; justify-content: end;">
                      <a class="custom_dark-btn" style="color: #FFFFFF"  @click="routeTo('SecurityContent', securityContent.ID)" >
                          Read More
                      </a>
                  </div>
                </div>
              </div>
              <div v-if="securityContent.imageID !== null" class="col-md-4 d-flex justify-content-center align-items-center">
                <div v-if="securityContent.imagelocation.includes('.pdf')" class="fruit_img-box d-flex justify-content-center align-items-center">
                  <!-- <img :src="getImage(securityContent.images[0].imagelocation)" @click="viewImage(securityContent.images[0].imagelocation)" style="border-radius: 10px; cursor: pointer;" alt="" class="" width="250px" /> -->
                  <a class="custom_dark-btn" title="Read Attached Document" style="color: #FFFFFF; display: flex; justify-content: center; align-items: center; height: 145px; border-radius: 50%; font-size: 70px;"  @click="viewImage(securityContent.imagelocation)" >
                    <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                  </a>
                </div>
		<div v-else-if="securityContent.imagelocation.includes('.csv') || securityContent.imagelocation.includes('.apk') || securityContent.imagelocation.includes('.xlsx')|| securityContent.imagelocation.includes('.ppt')|| securityContent.imagelocation.includes('.pptx') || securityContent.imagelocation.includes('.docx') || securityContent.imagelocation.includes('.doc') || securityContent.imagelocation.includes('.mp4')" class="fruit_img-box d-flex justify-content-center align-items-center">
		    <a class="custom_dark-btn" title="Download File" style="color: #FFFFFF; display: flex; justify-content: center; align-items: center; height: 58px; width: 200px; border-radius: 17%;font-size: 19px;font-weight: 600;"  @click="viewImage(securityContent.imagelocation)" >
			Download here
			<font-awesome-icon icon="fa-solid fa-download" style="padding-left: 8px; font-size: 21px;" />
		    </a>
		</div>
                <div v-else class="fruit_img-box d-flex justify-content-center align-items-center">
                  <img :src="getImage(securityContent.imagelocation)" @click="viewImage(securityContent.imagelocation)" style="border-radius: 10px; cursor: pointer;" alt="" class="" width="250px" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <b-row style="position: relative; display: flex; align-items: center; justify-content: center;">
                <div class='loader'>
                    <!-- <ClipLoader 
                        class="custom-class"
                        :loading=loading
                        color="#f0ce0def"
                        size=50
                        /> -->
                </div>
            </b-row>
        </template>
        </div>
      </section>
<!-- footer section -->
      <Footer/>
      <!-- footer section -->

  </div>
</template>

<script>
import axios from 'axios'
import TopNavBar from './Navbar.vue'
import Footer from './Bottombar.vue'

export default {
components:{
TopNavBar,Footer
},
 data(){
    return{
        securityContentData:[
          ],
          loading: false,
          filter: '',
    }
 },
 computed:{
        filterTable(){
            var searchItems = this.securityContentData;
            var searchString  = this.filter;
            if(searchString ===''){
                return searchItems
            }
            searchString =  searchString.trim().toLowerCase();
            searchItems = searchItems.filter(function(item){
                if(item.headline.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            return searchItems ;
        },
    },
 mounted(){
    this.getAllSecurityContent();
  },
  methods:{
    routeTo(name, ID){
      this.$router.push({name: name, params: {id:ID}});
    },
    getAllSecurityContent(){
      this.loading = true;
        this.$store.dispatch('getAllSecurityContent')
        .then(response =>{
        this.securityContentData = response.data.securityContentResult;
        console.log("securityContent", response.data);
        })
        .catch(error =>{
            console.log(error);
        })
        .finally(()=>{
          this.loading = false;
        })
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
        if(`${axios.defaults.baseURL}/static/securityContents/${imagelocation}`){
          return `${axios.defaults.baseURL}/static/securityContents/${imagelocation}`;
        }
        return null;
      },
      viewImage(imagelocation){
        window.open(`${axios.defaults.baseURL}/static/securityContents/${imagelocation}`, '_blank');
      }
  }
}
</script>

<style scoped>
@import '../../assets/css/bootstrap.css';
  @import '../../assets/css/responsive.css';
  @import '../../assets/css/style.css';

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
  @media (max-width: 768px) {
       .hero_area {
            margin-bottom: 90px !important;
        }
        .some-box{
          padding-left: 30px !important;
        }
    }
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
    .fruit_section {
    margin-top: 5% !important;
  }
</style>
