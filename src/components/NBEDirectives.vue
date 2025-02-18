<template>
  <div>
    <!-- header section starts -->
    <TopNavBar />
    <section class="fruit_section min-vh-100">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-2 mt-2" style="display: flex; justify-content: end;">
            <img :src="require('../assets/images/NBE.jpg')" alt="" class="" width="60px" />
          </div>
          <div class="col-md-6" @click="goTo()" style="display: flex; justify-content: start; cursor: pointer;">
            <div class="row">
              <h2 class="custom_heading mt-4">National Bank Directives <span style="font-weight: 400; font-size: 18px;">{{ filterTable.length }} Documents</span></h2>
            </div>
          </div>
        </div>
        <div class="row" style="display: flex; align-items: center; justify-content: center; text-align: center;">
          <input type="search" v-model="filter" placeholder="Search" style="border: none; outline: none; border-bottom: 0.8px solid rgb(37, 91, 48); width: 20%; margin: 10px 0; text-align: center; color: rgb(37, 91, 48);" />
        </div>
        <template v-if="filterTable.length === 0">
          <div class="row layout_padding2" style="display: flex; justify-content: center;">
            <p>No policies Found.</p>
          </div>
        </template>
        <template v-else>
          <div class="row layout_padding" style="border-bottom: 0.8px solid rgba(240, 206, 13, 0.937) !important;" v-for="(policy, index) in filterTable" :key="index">
            <div class="col-md-8">
              <div class="fruit_detail-box">
                <h3>{{ policy.title }}</h3>
                <p class="mt-4 mb-5">{{ policy.description }}</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="row mt-5">
                <a @click="downloadPolicy(policy.filelocation)" class="custom_dark-btn links-btn">View</a>
              </div>
            </div>
            <div class="col-md-2">
              <div class="row mt-5">
                <a :href="policy.link" target="_blank" class="custom_dark-btn links-btn">NBE Link</a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
    <!-- footer section -->
    <Footer />
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
  data() {
    return {
      policies: [],
      filter: '',
      loading: false,
      error: null,
    };
  },
  methods: {
    // Fetch policies based on the type
    fetchPolicies(type) {
      this.loading = true;
      this.error = null;
      const policyType = type || 'DefaultType'; // Default fallback if no type is specified
      this.$store
        .dispatch('getAllNBEDirectives', policyType)  // Pass type to store action
        .then((response) => {
          this.policies = response.data.recordset; // Update policies with response data
        })
        .catch((error) => {
          console.error('Error fetching policies:', error);
          this.error = 'Failed to fetch policies. Please try again.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    '$route.query.type': {
      immediate: true,  // Trigger immediately on component mount
      handler(newType) {
        this.fetchPolicies(newType);  // Fetch policies whenever the type changes
      },
    },
  },
  mounted() {
    // Initial data fetch when component is mounted
    this.fetchPolicies(this.$route.query.type);
  },
  computed: {
  filterTable() {
    let filteredItems = this.policies;
    const searchString = this.filter.trim().toLowerCase();

    if (searchString !== '') {
      filteredItems = filteredItems.filter(policy => 
        policy.title.toLowerCase().includes(searchString)
      );
    }
    return filteredItems;
  },
},

};
</script>

<style>
  @import '../assets/css/bootstrap.css';
  @import '../assets/css/responsive.css';
  @import '../assets/css/style.css';
  .custom_dark-btn:hover {
    color: rgb(37, 91, 48) !important;
  }
  .custom_dark-btn {
    color: #ffffff !important;
    cursor: pointer;
  }
  .fruit_section{
    margin-top: 5%;
  }
</style>
