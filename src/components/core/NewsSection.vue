<template>
  <section class="fruit_section layout_padding">
        <div class="container">
          <h2 class="custom_heading mt-3 collapse-help-title">Latest News</h2>
          <template  v-if="loading == false ">
            <div class="row layout_padding2" style="border-bottom: .8px solid rgba(240, 206, 13, 0.937);"  v-for="(news, index) in newsData" :key="index">
              <div class="col-md-8">
                <div class="fruit_detail-box">
                  <h3>
                    {{news.headline}}
                  </h3>
                  <div class="row">
                    <div class="col-md-2" style="color: #f0ce0def; text-align:center">
                      <p class="mt-4" style="margin-bottom: 0px !important; text-align: center;">{{getDateFrom(news.createdat)}}</p>
                      <p style="text-align: center;font-size: 32px;text-transform: uppercase;margin-bottom: 0px !important;">{{getMonthFrom(news.createdat)}}</p>
                      <p class="mb-5">{{getYearFrom(news.createdat)}}</p>
                    </div>
                    <div class="col-md-10">
                      <p class="mt-2 mb-2 sub-heading">
                        {{news.subheading}}
                      </p>
                      <p style="text-align: justify">
                        {{news.details.substring(0,310)}} 
                      </p>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: end;">
                      <a class="custom_dark-btn" style="color: #FFFFFF"  @click="routeTo('News', news.ID)" >
                          Read More
                      </a>
                  </div>
                </div>
              </div>
              <div v-if="news.imageID !== null" class="col-md-4 d-flex justify-content-center align-items-center">
                <div v-if="news.imagelocation.includes('.pdf')" class="fruit_img-box d-flex justify-content-center align-items-center">
                  <!-- <img :src="getImage(news.images[0].imagelocation)" @click="viewImage(news.images[0].imagelocation)" style="border-radius: 10px; cursor: pointer;" alt="" class="" width="250px" /> -->
                  <!--a class="custom_dark-btn" title="Read Attached Document" style="color: #FFFFFF; display: flex; justify-content: center; align-items: center; height: 145px; border-radius: 50%; font-size: 70px;"  @click="viewImage(news.imagelocation)" >
                    <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                  </a -->
                      <a class="custom_dark-btn" title="Read Attached Document" style="color: #FFFFFF; display: flex;flex-direction:column;height: 145px; border-radius: 50%; font-size: 64px;"   @click="viewImage(news.imagelocation)" >
                          <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                           <small style="padding:2px; font-size:12px;">Read Attachment</small>
                        </a>
                </div>

		<div v-else-if="news.imagelocation.includes('.csv') || news.imagelocation.includes('.apk') || news.imagelocation.includes('.xlsx')|| news.imagelocation.includes('.ppt')|| news.imagelocation.includes('.pptx') || news.imagelocation.includes('.docx') || news.imagelocation.includes('.doc') || news.imagelocation.includes('.mp4')" class="fruit_img-box d-flex justify-content-center align-items-center">
		    <!--a class="custom_dark-btn" title="Download File" style="color: #FFFFFF; display: flex; justify-content: center; align-items: center; height: 58px; width: 200px; border-radius: 17%;font-size: 19px;font-weight: 600;"  @click="viewImage(news.imagelocation)" >
			Download here
			<font-awesome-icon icon="fa-solid fa-download" style="padding-left: 8px; font-size: 21px;" />
		    </a -->
 <a class="custom_dark-btn" title="Read Attached Document" style="color: #FFFFFF; display: flex;flex-direction:column;height: 145px; border-radius: 50%; font-size: 64px;"   @click="viewImage(news.imagelocation)" >
                          <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                           <small style="padding:2px; font-size:12px;">Download Attachment</small>
                        </a>
		</div>
                <div v-else class="fruit_img-box d-flex justify-content-center align-items-center">
                  <img :src="getImage(news.imagelocation)" @click="viewImage(news.imagelocation)" style="border-radius: 10px; cursor: pointer;" alt="" class="" width="250px" />
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
</template>

<script>
import axios from 'axios'
export default {
 data(){
    return{
        newsData:[
          ],
          loading: false
    }
 },
 mounted(){
    this.getAllNews();
  },
  methods:{
    routeTo(name, ID){
      this.$router.push({name: name, params: {id:ID}});
    },
    getAllNews(){
      this.loading = true;
        this.$store.dispatch('getAllNews')
        .then(response =>{
        this.newsData = response.data.newsResult;
        console.log("news", response.data);
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
        if(`${axios.defaults.baseURL}/static/news/${imagelocation}`){
          return `${axios.defaults.baseURL}/static/news/${imagelocation}`;
        }
        return null;
      },
      viewImage(imagelocation){
        window.open(`${axios.defaults.baseURL}/static/news/${imagelocation}`, '_blank');
      }
  }
}
</script>

<style scoped>
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
</style>