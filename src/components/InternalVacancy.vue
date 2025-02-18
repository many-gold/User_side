<template>
  <div>
    <!-- Header section -->
    <TopNavBar />

    <section class="fruit_section">
      <div class="container">
        <h2 class="importantlink_heading mt-3 text-center">
          <span>Internal Vacancy</span>
        </h2>

        <b-row>
          <b-card style="width: 100%">
            <b-row>
              <b-col lg="4" class="my-1">
                <b-form-group class="mb-0">
                  <b-input-group size="sm">
                    <b-form-input 
                      id="filter-input"
                      v-model="filter"
                      type="search"
                      placeholder="Filter by job position" />
                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-col>
              <div>
                <!-- Fixed Table Code -->
                <b-table 
                  :items="filterTable"
                  :fields="tableFields"
                  small
                  sticky-header
                  striped
                  hover
                  responsive="sm"
                  style="max-height: 400px; overflow-y: auto;">
                  
                  <!-- Index Column -->
                  <template #cell(index)="data">
                    {{ data.index + 1 }}
                  </template>

                  <!-- Vacancy Details -->
                  <template #cell(jobposition)="data">
                    {{ data.item.jobposition || "No job position" }}
                  </template>
                  <template #cell(qualification)="data">
                    {{ data.item.qualification || "No qualification" }}
                  </template>
                  <template #cell(experience)="data">
                    {{ data.item.experience || "No experience" }}
                  </template>
                  <template #cell(workplace)="data">
                    {{ data.item.workplace || "No workplace" }}
                  </template>

                  <!-- File Download -->
                  <template #cell(filelocation)="data">
                    <b-button 
                      v-if="data.item.filelocation" 
                     
                      size="sm" 
                      :href="'/static/Vacancy/' + data.item.filelocation" 
                      target="_blank">
                      View Details
                    </b-button>
                    <span v-else>No file available</span>
                  </template>

                  <!-- Empty State -->
                  <template #empty>
                    <b-tr>
                      <b-td colspan="6" class="text-center">No vacancies available</b-td>
                    </b-tr>
                  </template>
                </b-table>
              </div>
            </b-col>
          </b-card>
        </b-row>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import TopNavBar from './core/Navbar.vue';
import Footer from './core/Bottombar.vue';

export default {
  components: {
    TopNavBar,
    Footer
  },

  data() {
    return {
      items: [],
      filter: '',
      tableFields: [
        { key: "index", label: "No." },
        { key: "jobposition", label: "Job Position" },
        { key: "qualification", label: "Qualification" },
        { key: "experience", label: "Experience" },
        { key: "workplace", label: "Workplace" },
        { key: "filelocation", label: "File" }
      ]
    };
  },

  mounted() {
    this.getAllVacancy();
  },

  computed: {
    filterTable() {
      if (!this.filter) return this.items;
      return this.items.filter(item =>
        item.jobposition.toLowerCase().includes(this.filter.toLowerCase()) ||
        item.qualification.toLowerCase().includes(this.filter.toLowerCase()) ||
        item.experience.toLowerCase().includes(this.filter.toLowerCase()) ||
        item.workplace.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  },

  methods: {
    async getAllVacancy() {
      try {
        const response = await this.$store.dispatch('getAllVacancy');
        this.items = response.data.recordset || [];
      } catch (error) {
        console.error('Error loading vacancies:', error);
      }
    }
  }
};
</script>

<style>
.fruit_section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}

.no-data {
  text-align: center;
  font-weight: bold;
  color: red;
}
</style>
