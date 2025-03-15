<template>
    <div>
        <!-- Header section -->
        <TopNavBar />
  
        <section class="fruit_section">
            <div class="container">
                <h2 class="importantlink_heading mt-3 text-center"><span>Departments Phone Number</span></h2>
  
                <b-row>
                    <b-card style="width: 100%">
                        <b-row>
                            <b-col lg="4" class="my-1">
                                <b-form-group class="mb-0">
                                    <b-input-group size="sm">
                                        <b-form-input id="filter-input" v-model="filter" type="search"
                                            placeholder="Filter by description" />
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
                                <b-table :items="filterTable" :fields="tableFields" :small="true" sticky-header striped
                                    hover responsive="sm" style="max-height: 400px; overflow-y: auto;">
                                    <!-- Index Column -->
                                    <template #cell(index)="data">
                                        {{ data.index + 1 }}
                                    </template>
  
                                    <!-- Description Column -->
                                    <template #cell(DepartmentName)="data">
                                        {{ data.item.DepartmentName || "No Department Name" }}
                                    </template>
  
                                    <template #cell(Phone)="data">
                                        {{ data.item.Phone || "No Phone" }}
                                    </template>
                                    
  
                                    <!-- Empty State -->
                                    <template #empty>
                                        <b-tr>
                                            <b-td colspan="3" class="text-center">Nothing here</b-td>
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
                { key: "DepartmentName", label: "Department Name" },
                { key: "Phone", label: "Phone" }
            ]
        };
    },
  
    mounted() {
        this.getAlldepartmentphone();
        this.$nextTick(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });
    },
  
    computed: {
        filterTable() {
            if (!this.filter) return this.items;
            return this.items.filter(item =>
                item.description.toLowerCase().includes(this.filter.toLowerCase())
            );
        }
    },
  
    methods: {
        async getAlldepartmentphone() {
            try {
                const response = await this.$store.dispatch('getAlldepartmentphone');
                this.items = response.data.recordset || [];
  
            } catch (error) {
                console.error('Error loading links:', error);
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
  