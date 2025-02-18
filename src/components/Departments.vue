<template>
  <div>
 <TopNavBar/>
    <section class="service_section layout_padding min-vh-100">
    <div class="container">
      <h2 class="custom_heading">Policies And Procedures <span style="font-weight: 400;font-size: 18px;">{{filterTable.length}} Documents</span></h2>
      <div class="row" style="display: flex; align-items: center; justify-content: center; text-align: center;">
                    <input type="search" v-model="filter" placeholder="Search" style="border: none;outline: none; border-bottom: 0.8px solid rgb(37, 91, 48);width: 20%;margin: 10px 0; text-align: center; color: rgb(37, 91, 48);">
                    
              </div>
      <div class=" layout_padding2">
        <div class="card-deck">
          <div class="row">
            <div class="col-md-4 mb-2" v-for="(department, index) in filterTable" :key="index">
              <div class="card">
                <div class="card-body operations">
                  <h5 class="card-title">{{department.name}}</h5>
                  <p class="card-text">
                    {{department.description}}
                  </p>
                </div>
                <div class="card-footer">
                  <div class="row">
                    <div class="col-md-6">
                      <a class="custom_dark-btn" style="color: #FFFFFF"  @click="routeTo('Policies', department.ID)" >
                          Policy
                      </a>
                    </div>
                    <div class="col-md-6">
                    <a class="custom_dark-btn" style="color: #FFFFFF" @click="routeTo('Procedures', department.ID)" >
                          Procedures
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
       
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
export default {
   components: { 
      TopNavBar,
      Footer
    },
  name: 'Home',

  data() {
    return {
      image: "@/assets/background.png",
      departments:[
      ],
	  filter: ''
    };
  },
  computed:{
        filterTable(){
            var searchItems = this.departments;
            var searchString  = this.filter;
            if(searchString ===''){
                return searchItems
            }
            searchString =  searchString.trim().toLowerCase();
            searchItems = searchItems.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            return searchItems ;
        },
    },
   mounted(){
        this.getAllOperations();
       
    },
  methods:{
    routeTo(name, ID){
      this.$router.push({name: name, params: {id:ID}});
    },
    getAllOperations(){
            this.$store.dispatch('getAllOperations')
            .then(response =>{
            this.departments = response.data.recordset;
            console.log(this.items);
            })
            .catch(error =>{
                console.log(error);
            });
        },
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
  .operations{
    height: 268px;
  }
  .service_section{
    margin-top: 5%;
  }
</style>
