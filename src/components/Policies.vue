<template>
  <div>
    <!-- header section strats -->
    <TopNavBar/>
      <section class="fruit_section">
        <div class="container">
          <h2 class="custom_heading mt-3">Policies</h2>
          <p class="custom_heading-text">
            {{operation.name}}
          </p>
          <template v-if="policies.length === 0">
            <div class="row layout_padding2" style="display: flex; justify-content: center;">
                <p>
                  No policies uploaded for {{operation.name}} yet.
                </p>
            </div>
          </template>
          <template v-else>
            <div class="row layout_padding2" style="border-bottom: 0.8px solid rgba(240, 206, 13, 0.937) !important;" v-for="(policy, index) in policies" :key="index">
              <div class="col-md-8">
                <div class="fruit_detail-box">
                  <h3>
                    {{policy.title}}
                  </h3>
                    <p class="mt-4 mb-5">
                        {{policy.description}}
                    </p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row mt-5">
                    <a @click="downloadPolicy(policy.filelocation)" class="custom_dark-btn links-btn">
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
  name: 'Policies',
  data() {
    return {
      image: "@/assets/background.png",
      policies:[
      ],
      operation:{
      },
      policyFile: null
    };
  },
  methods:{
    getAllPolicies(){
            // this.operationID = this.$route.params.id;
            this.$store.dispatch('getPoliciesByID', {operationID: this.$route.params.id})
            .then(response =>{
            this.policies = response.data.recordset;
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
        // downloadPolicy(filelocation){
        //       window.open(`${axios.defaults.baseURL}/static/policy/${filelocation}`, '_blank');
        // }
        downloadPolicy(filelocation) {
    // Use the proxy URL, and ensure it's being properly fetched
    const proxyUrl = `${axios.defaults.baseURL}/static/policy/${filelocation}`;

    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const fileType = blob.type;

            // If the file is a PDF or an image, open it in the browser
            if (fileType.includes("pdf") || fileType.includes("image")) {
                const url = window.URL.createObjectURL(blob);
                window.open(url, "_blank");
            } else {
                // If it's another file type, trigger a download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = filelocation;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
        })
        .catch(error => console.error("Error downloading file:", error));
}


  },
  mounted(){
    this.getAllPolicies()
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
