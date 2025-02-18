<template>
  <!-- <div>
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="currentImg.image" />
        <div class="silder-content">
          <p class="silder-title">
            {{currentImg.title}}
          </p>
          <p class="silder-subtitle">
            {{currentImg.subtitle}}
          </p>
          <p class="silder-subtitle" v-for="(some, index) in currentImg.detail" :key="index">
            {{some}}
          </p>
          <div class="div">
              <a class="custom_dark-btn" style="color: #FFFFFF"  >
               Check
              </a>
          </div>
        </div>
      </div>
    </transition-group>
    <a class="prev" @click="prev" href="#">&#10094;</a>
    <a class="next" @click="next" href="#">&#10095;</a>
  </div> -->
  <div>
     <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="getImage(currentImg.filelocation)" />
        <div v-if="currentImg.position === 'Left'" class="silder-content-left">
          <div v-if="currentImg.color === 'color-group-2'" class="G-text-Y-btn">
            <p class="silder-title">
              {{currentImg.headline}}
            </p>
            <p v-if="currentImg.subheading" class="silder-subtitle">
              <p v-if="currentImg.subheading" v-html="sanitizedSubheading" class="silder-subtitle"></p>

              {{currentImg.subheading}}
            </p>
            <p v-if="currentImg.link" class="silder-subtitle">
              {{currentImg.details}}
            </p>
            <div class="div" v-if="currentImg.link">
                <a class="custom_dark-btn" @click="routeTo(currentImg.link)">
                Check
                </a>
            </div>
          </div>
          <div v-else-if="currentImg.color === 'color-group-3'" class="Y-text-G-btn">
            <p class="silder-title">
              {{currentImg.headline}}
            </p>
            <p v-if="currentImg.subheading" class="silder-subtitle">
              {{currentImg.subheading}}
            </p>
            <p v-if="currentImg.link" class="silder-subtitle">
              {{currentImg.details}}
            </p>
            <div class="div" v-if="currentImg.link">
                <a class="custom_dark-btn" @click="routeTo(currentImg.link)">
                Check
                </a>
            </div>
          </div>
          <div v-else class="W-text-G-btn">
            <p class="silder-title">
              {{currentImg.headline}}
            </p>
            <p v-if="currentImg.subheading" class="silder-subtitle">
              {{currentImg.subheading}}
            </p>
            <p v-if="currentImg.link" class="silder-subtitle">
              {{currentImg.details}}
            </p>
            <div class="div" v-if="currentImg.link">
                <a class="custom_dark-btn" @click="routeTo(currentImg.link)">
                Check
                </a>
            </div>
          </div>
        </div>
        <div v-else class="slider-content-right">
          <div v-if="currentImg.color === 'color-group-2'" class="G-text-Y-btn">
            <p class="silder-title">
              {{currentImg.headline}}
            </p>
            <p v-if="currentImg.subheading" class="silder-subtitle">
              {{currentImg.subheading}}
            </p>
            <p v-if="currentImg.link" class="silder-subtitle">
              {{currentImg.details}}
            </p>
            <div class="div" v-if="currentImg.link">
                <a class="custom_dark-btn" @click="routeTo(currentImg.link)">
                Check
                </a>
            </div>
          </div>
          <div v-else-if="currentImg.color === 'color-group-3'" class="Y-text-G-btn">
            <p class="silder-title">
              {{currentImg.headline}}
            </p>
            <p v-if="currentImg.subheading" class="silder-subtitle">
              {{currentImg.subheading}}
            </p>
            <p v-if="currentImg.link" class="silder-subtitle">
              {{currentImg.details}}
            </p>
            <div class="div" v-if="currentImg.link">
                <a class="custom_dark-btn" @click="routeTo(currentImg.link)">
                Check
                </a>
            </div>
          </div>
          <div v-else class="W-text-G-btn">
            <p class="silder-title">
              {{currentImg.headline}}
            </p>
            <p v-if="currentImg.subheading" class="silder-subtitle">
              {{currentImg.subheading}}
            </p>
            <p v-if="currentImg.link" class="silder-subtitle">
              {{currentImg.details}}
            </p>
            <div class="div" v-if="currentImg.link">
                <a class="custom_dark-btn" @click="routeTo(currentImg.link)">
                Check
                </a>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <a class="prev" @click="prev" href="#">&#10094;</a>
    <a class="next" @click="next" href="#">&#10095;</a>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "Slider",
  data() {
    return {
      sliderData:[],
      images: [
        {
          image: require('../../assets/images/FrontPagePic1.png'),
          title: 'Check Out',
          subtitle: 'Newly Posted Policies and Procedures',
          detail: [
              'Accounting Policies',
              'HR Policies'
          ],
          to: '/InformationPortal/departments'
        },
        {
          image: require('../../assets/images/FrontPagePic2.png'),
          title: 'Check Out',
          subtitle: 'Newly Posted Vacancy',
          detail: [
              'Customer Service Officer',
          ],
          to: 'InformationPortal/humanResource'
        },
        {
          image: require('../../assets/images/FrontPagePic3.png'),
          title: 'Check Out',
          subtitle: 'NBE Directive',
          detail: [
              'Closed Cheque Policies',
          ],
          to: '/InformationPortal/nbeDirectives'
        },
        {
          image: require('../../assets/images/FrontPagePic4.png'),
          title: 'Check Out',
          subtitle: 'Closed Cheque',
          detail: [
              'Closed Cheque',
          ],
          to: '/InformationPortal/sanctionList'
        },
      ],
      timer: null,
      currentIndex: 0,
    };
  },

  mounted: function() {
    this.getAllAnnouncements();
    this.startSlide();
  },

  methods: {
    startSlide: function() {
      /*this.timer = setInterval(this.next, 90000);*/
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    },
    getAllAnnouncements(){
      this.$store.dispatch('getAllAnnouncements')
        .then(response =>{
          this.sliderData = response.data.recordset;
        })
        .catch(error =>{
            console.log(error);
        });
    },
    getImage(imagelocation){
      return `${axios.defaults.baseURL}/static/Announcement/${imagelocation}`;
    },
    routeTo(link){
      window.open(link, '_blank');
      return;
    }
  },

  computed: {
    currentImg: function() {
      return this.sliderData[Math.abs(this.currentIndex) % this.sliderData.length];
    }
  }
};
</script>
<style scoped>
  /* @import '../../assets/css/bootstrap.css';
    @import '../../assets/css/responsive.css';
    @import '../../assets/css/style.css'; */
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.9s ease;
        overflow: hidden;
        visibility: visible;
        position: absolute;
        width:100%;
        opacity: 1;
    }

    .fade-enter,
    .fade-leave-to {
        visibility: hidden;
        width:100%;
        opacity: 0;
    }

    img {
        height:89vh;
        width:100%;
        opacity:1;
    }

    .prev{
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: 2%;
        height: 62px;
        color: rgba(240, 206, 13, 0.937);
        background-color: #FFFFFF;
        font-weight: bold;
        font-size: 18px;
        transition: 0.5s ease;
        border-radius: 0 50px 50px 0;
        text-decoration: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
    }
    .next{
      cursor: pointer;
        position: absolute;
        top: 50%;
        width: 2%;
        height: 62px;
        color: rgba(240, 206, 13, 0.937);
        background-color: #FFFFFF;
        font-weight: bold;
        font-size: 18px;
        transition: 0.5s ease;
        border-radius: 50px 0 0 50px;
        text-decoration: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 10px;
    }
    .next {
    right: 0;
    }

    .prev {
    left: 0;
    }

    .prev:hover, .next:hover {
      background-color: rgb(37, 91, 48);
    }
    .silder-content-left{
      position: absolute;
      top: 45%;
      left: 25%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      height: 31vh;
      width: 30%;
      color: #FFFFFF;
      font-weight: bold;
    }
    .slider-content-right{
      position: absolute;
      top: 45%;
      left: 75%;
      text-align: right;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      height: 31vh;
      width: 30%;
      font-weight: bold;
    }
    .W-text-G-btn{
      color: #FFFFFF;
    }
    .W-text-G-btn > .div > .custom_dark-btn:hover{
      color:rgb(37, 91, 48) !important;
    }
    .W-text-G-btn >  .div > .custom_dark-btn{
      color: rgb(37, 91, 48) !important;
      cursor: pointer;
      background-color: #FFFFFF!important;
      border: none !important;
    }

    .G-text-Y-btn{
      color: rgb(37, 91, 48);
    }
    .G-text-Y-btn > .div > .custom_dark-btn:hover{
      color:rgba(240, 206, 13) !important;
    }
    .G-text-Y-btn >  .div > .custom_dark-btn{
      color: rgba(240, 206, 13) !important;
      cursor: pointer;
      background-color: rgb(37, 91, 48)!important;
      border: none !important;
    }

    .Y-text-G-btn{
      color: rgba(240, 206, 13);
    }
    .Y-text-G-btn > .div > .custom_dark-btn:hover{
      color:rgb(37, 91, 48) !important;
    }
    .Y-text-G-btn >  .div > .custom_dark-btn{
      color: rgb(37, 91, 48) !important;
      cursor: pointer;
      background-color: rgba(240, 206, 13)!important;
      border: none !important;
    }

    .silder-title{
      font-size: 3.7rem;
      text-transform: uppercase;
    }
    .silder-subtitle{
      text-align: justify;
    }
</style>
