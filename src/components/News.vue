<template>
  <div>
    <!-- header section strats -->
    <TopNavBar/>
      <section class="fruit_section">
        <div class="container">
          <h2 class="custom_heading mt-3">News</h2>
          <p class="custom_heading-text">
            {{newsData.headline}}
          </p>
          <template>
            <div class="row layout_padding2">
              <div class="col-md-6">
                <div class="fruit_detail-box">
                  <div class="row">
                    <div class="col-md-2" style="color: #f0ce0def; text-align:center">
                      <p class="mt-4" style="margin-bottom: 0px !important; text-align: center;">{{getDateFrom(newsData.createdat)}}</p>
                      <p style="text-align: center;font-size: 32px;text-transform: uppercase;margin-bottom: 0px !important;">{{getMonthFrom(newsData.createdat)}}</p>
                      <p class="mb-5">{{getYearFrom(newsData.createdat)}}</p>
                    </div>
                    <div class="col-md-10">
                      <p class="sub-heading mt-4 mb-4"> 
                        {{newsData.subheading}}
                      </p>
                      <p class="mt-4 mb-4" style="text-align: justify">
                        {{newsData.details}}
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" v-if="newsData.note !== ''">
                      <font-awesome-icon icon="fa-solid fa-circle-info" style="font-size: 25px; margin-right: 15px;" /> <span style="color: rgba(240, 206, 13, 0.937)">{{newsData.note}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 d-flex justify-content-center align-items-center">
                <div class="row">
                    <div class="col-md-6 mt-2"  v-for="(image, index) in newsData.images" :key="index">
                        <a v-if="image.imagelocation.includes('.pdf')" class="custom_dark-btn" title="Read Attached Document" style="color: #FFFFFF; display: flex;flex-direction:column;height: 145px; border-radius: 50%; font-size: 64px;"  @click="viewImage(image.imagelocation)" >
                          <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                           <small style="padding:2px; font-size:12px;">Read Attachment</small>
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
import TopNavBar from './core/Navbar.vue'
import Footer from './core/Bottombar.vue'
import axios from 'axios'
export default {
   components: { 
      TopNavBar,
      Footer
    },
  name: 'News',
  data() {
    return {
      image: "@/assets/background.png",
      newsData:{}
    };
  },
   mounted(){
    this.getNewsByID()
  },
  methods:{
     getNewsByID(){
            // this.operationID = this.$route.params.id;
            this.$store.dispatch('getNewsByID', {ID: this.$route.params.id})
            .then(response =>{
            this.newsData = response.data.newsResult;
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
      getImage(imagelocation){
        return `${axios.defaults.baseURL}/static/news/${imagelocation}`;
      },
      viewImage(imagelocation){
        window.open(`${axios.defaults.baseURL}/static/news/${imagelocation}`, '_blank');
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
  
</style>
