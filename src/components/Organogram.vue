<template>
  <div>
    <!-- header section strats -->
    <TopNavBar/>
      <section class="fruit_section min-vh-100">
        <div class="container">
          <h2 class="custom_heading mt-3">Organogram <span style="font-weight: 400;font-size: 18px;">{{filterTable.length}} Documents</span></h2>
          <template v-if="filterTable.length === 0">
            <div class="row layout_padding2" style="display: flex; justify-content: center;">
                <p>
                  No content uploaded yet.
                </p>
            </div>
          </template>
          <template v-else>
          <div class="row" style="display: flex; align-items: center; justify-content: center; text-align: center;">
                    <input type="search" v-model="filter" placeholder="Search" style="border: none;outline: none; border-bottom: 0.8px solid rgb(37, 91, 48);width: 20%;margin: 10px 0; text-align: center; color: rgb(37, 91, 48);">
              </div>
             <div class="rowlayout_padding2" style="border-bottom: 0.8px solid rgba(240, 206, 13, 0.937) !important;" v-for="(post, index) in filterTable" :key="index">
                    <div class="row">

                        <div class="col-md-9">
                            <h3>
                                {{post.title}}
                            </h3>
                            <p class="sub-heading mt-4 mb-4" style="color:rgba(240, 206, 13, 0.937)"> 
                                {{post.subtitle}}
                            </p>
                            <p class="mt-4 mb-4" style="text-align: justify">
                                {{post.details}}
                            </p>
                            
                           
                        </div>
                        <div class="col-md-3 mt-5" v-if="post.filelocation">
                                <a @click="downloadPolicy(post.filelocation)" class="custom_dark-btn links-btn">
                                View Attached Document
                                </a>
                        </div>
                        <img :src="getImage(post.filelocation)" :alt="post.caption" />
              
                    </div>
                    <div class="row">
                            <div class="col-md-12" v-if="post.note">
                            <font-awesome-icon icon="fa-solid fa-circle-info" style="font-size: 25px; margin-right: 15px;" /> <span style="color: rgba(240, 206, 13, 0.937)">{{post.note}}</span>
                            </div>
                    </div>
                    <div>
                      
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
  name: 'Organogram',
  data() {
    return {
      image: "@/assets/background.png",
      posts:[
      ],
      operation:{
      },
      filter: '',
      policyFile: null
    };
  },
  methods:{
    getAllPosts(){
            // this.operationID = this.$route.params.id;
            this.$store.dispatch('getOrganogram')
            .then(response =>{
            this.posts = response.data.recordset;
            console.log(this.posts);
            })
            .catch(error =>{
                console.log(error);
            });
        },
        downloadPolicy(filelocation){
              window.open(`${axios.defaults.baseURL}/static/Organogram/${filelocation}`, '_blank');
        },
        getImage(filelocation){
      return `${axios.defaults.baseURL}/static/organogram/${filelocation}`;
    },
    

    // viewPhoto(index) {
    //   this.selectedPhoto = index;
    // },
  },
  computed:{
        filterTable(){
            var searchItems = this.posts;
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
    this.getAllPosts()
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
  .fruit_section{
    margin-top: 5%;
  }
  .preview-img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
}

</style>
