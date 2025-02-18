<template>
  <div>
    <!-- header section strats -->
    <TopNavBar/>
      <section class="fruit_section">
        <div class="container">
          <h2 class="custom_heading mt-3">Procedures</h2>
          <p class="custom_heading-text">
            {{operation.name}}
          </p>
          <template v-if="procedures.length === 0">
            <div class="row layout_padding2" style="display: flex; justify-content: center;">
                <p>
                  No procedures uploaded for {{operation.name}} yet.
                </p>
            </div>
          </template>
          <template v-else>
            <div class="row layout_padding2" style="border-bottom: 0.8px solid rgba(240, 206, 13, 0.937) !important;" v-for="(procedure, index) in procedures" :key="index">
              <div class="col-md-8">
                <div class="fruit_detail-box">
                  <h3>
                    {{procedure.title}}
                  </h3>
                    <p class="mt-4 mb-5">
                        {{procedure.description}}
                    </p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row mt-5">
                    <a @click="downloadPolicy(procedure.filelocation)" class="custom_dark-btn links-btn">
                      View
                    </a>
                </div>
                <br/>
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
  name: 'Procedures',
  data() {
    return {
      image: "@/assets/background.png",
      procedures:[
      ],
      operation:{
      },
      policyFile: null
    };
  },
  methods:{
    getAllProcedures(){
            // this.operationID = this.$route.params.id;
            this.$store.dispatch('getProceduresByID', {operationID: this.$route.params.id})
            .then(response =>{
            this.procedures = response.data.recordset;
            console.log(this.policies);
            })
            .catch(error =>{
                console.log(error);
            });
        },
        getOperationByID(){
            this.$store.dispatch('getOperationByID', {ID: this.$route.params.id})
            .then(response =>{
            this.operation = response.data.recordset[0];
            // console.log(this.operation);
            })
            .catch(error =>{
                console.log(error);
            });
        },
        downloadPolicy(filelocation){
              window.open(`${axios.defaults.baseURL}/static/procedure/${filelocation}`, '_blank');
        }
  },
  mounted(){
    this.getAllProcedures()
    this.getOperationByID();
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
