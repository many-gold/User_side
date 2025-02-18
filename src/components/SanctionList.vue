<template>
  <div>
    <!-- header section strats -->
    <TopNavBar/>
      <section class="fruit_section min-vh-100">
        <div class="container">
          <h2 class="custom_heading mt-3">Sanctions and PEPs List <span style="font-weight: 400;font-size: 18px;">{{filterTable.length}} Documents</span></h2>
          <template v-if="filterTable.length === 0">
            <div class="row layout_padding2" style="display: flex; justify-content: center;">
                <p>
                  No Sanctions and PEPs uploaded yet.
                </p>
            </div>
          </template>
          <template v-else>
           <div class="row" style="display: flex; align-items: center; justify-content: center; text-align: center;">
                    <input type="search" v-model="filter" placeholder="Search" style="border: none;outline: none; border-bottom: 0.8px solid rgb(37, 91, 48);width: 20%;margin: 10px 0; text-align: center; color: rgb(37, 91, 48);">
              </div>
            <div class="row layout_padding mt-3" style="border-bottom: 0.8px solid rgba(240, 206, 13, 0.937) !important;" v-for="(sanction, index) in filterTable" :key="index">
              <div class="col-md-9">
                <div class="fruit_detail-box">
                  <div class="row">
                    <h3>
                      {{sanction.title}}
                    </h3>
                  </div>
                  <div class="row" style="color: rgba(240, 206, 13, 0.937); opacity: 0.5;font-size: 15px;">
                    <font-awesome-icon icon="fa-solid fa-clock" style="font-size: 18px;"/> <span class="ml-2"> {{getMonthFrom(sanction.createdat)}} {{getDateFrom(sanction.createdat)}}, {{getYearFrom(sanction.createdat)}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="row ">
                    <a @click="downloadPolicy(sanction.filelocation)" class="custom_dark-btn links-btn">
                      View
                    </a>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
      <Footer/>
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
  name: 'SanctionList',
  data() {
    return {
      image: "@/assets/background.png",
      sanctions:[
      ],
      filter:'',
      policyFile: null
    };
  },
  methods:{
      getAllSanctions(){
          // this.operationID = this.$route.params.id;
          this.$store.dispatch('getAllSanctions')
          .then(response =>{
              this.sanctions = response.data.recordset;
          })
          .catch(error =>{
              console.log(error);
          });
      },
      downloadPolicy(filelocation){
            window.open(`${axios.defaults.baseURL}/static/sanctionList/${filelocation}`, '_blank');
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
  },
 computed:{
        filterTable(){
            var searchItems = this.sanctions;
            var searchString  = this.filter;
            if(searchString ===''){
                return searchItems
            }
            searchString =  searchString.trim().toLowerCase();
            searchItems = searchItems.filter(function(item){
                if(item.title.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            return searchItems ;
        },
    },
  mounted(){
    this.getAllSanctions()
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
  .fruit_section{
    margin-top: 5%;
  }
</style>
