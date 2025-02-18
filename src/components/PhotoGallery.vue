<template>
  <div>
    <!-- Header section -->
    <TopNavBar />
    <section class="fruit_section zindex-5 min-vh-100">
      <div class="container">
        <h2 class="gallery_heading mt-3 text-center"><span>Photo Gallery</span></h2>

        <template v-if="filterTable.length === 0">
          <div class="no-content">
            <p>No content uploaded yet.</p>
          </div>
        </template>

        <template v-else>
          <div class="search-container">
            <input 
              type="search" 
              v-model="filter" 
              placeholder="Search" 
              class="search-input" 
            />
          </div>

          <div class="gallery">
            <div
              v-for="(photo, index) in filterTable"
              :key="index"
              class="photo-frame"
              @click="viewPhoto(index)"
            >
              <img :src="getImage(photo.filelocation)" :alt="photo.caption" />
              <p class="caption">{{ photo.caption }}</p>
            </div>
          </div>

          <!-- Modal for displaying selected photo with navigation -->
          <div v-if="selectedPhoto !== null" class="modal" @click.self="closeModal">
            <button class="nav-button prev" @click.stop="prevPhoto">❮</button>
            <div class="photo-index">
              <h1 class="modal-caption">{{ selectedPhoto + 1 }} / {{ filterTable.length }}</h1> <!-- Photo index and total count -->
            </div>
            <img :src="getImage(photo[selectedPhoto].filelocation)" :alt="photo[selectedPhoto].caption" />
            <button class="nav-button next" @click.stop="nextPhoto">❯</button>
            <p class="modal-caption">{{ photo[selectedPhoto].caption }}</p>
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
  data() {
    return {
      photo: [],
      filter: '',
      selectedPhoto: null,
    };
  },
  mounted() {
 this.getAllPhotoGallery();
},

  methods: {
    getAllPhotoGallery(){
      this.$store.dispatch('getAllPhotoGallery')
        .then(response =>{
          this.photo = response.data.recordset;
        })
        .catch(error =>{
            console.log(error);
        });
    },
    getImage(filelocation){
      return `${axios.defaults.baseURL}/static/PhotoGallery/${filelocation}`;
    },
    

    viewPhoto(index) {
      this.selectedPhoto = index;
    },
    closeModal() {
      this.selectedPhoto = null;
    },
    nextPhoto() {
      if (this.selectedPhoto !== null) {
        this.selectedPhoto = (this.selectedPhoto + 1) % this.photo.length;
      }
    },
    prevPhoto() {
      if (this.selectedPhoto !== null) {
        this.selectedPhoto = (this.selectedPhoto - 1 + this.photo.length) % this.photo.length;
      }
    },
  },
  computed: {
    filterTable() {
      if (!this.filter) return this.photo;
      return this.photo.filter((photo) =>
        photo.caption.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },
};
</script>
<style scoped>
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

.no-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  color: #666;
}
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.search-input {
  border: none;
  outline: none;
  border-bottom: 1px solid #255b30;
  width: 200px;
  padding: 5px;
  color: #255b30;
  text-align: center;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 15px;
  justify-items: center;
}
.photo-frame {
  width: 330px;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #e0e0e0;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}
.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.photo-frame:hover img {
  transform: scale(1.05);
}
.caption {
  display: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
   z-index: 999999; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
}
.modal img {
  
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  
}
.modal-caption {
  color: white;
  text-align: center;
  margin-top: 5px;
  font-size: 16px;
}
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0 15px;
}
.nav-button.prev {
  left: 10px;
}
.nav-button.next {
  right: 10px;
}
.nav-button:hover {
  color: #ddd;
}
.fruit_section{
    margin-top: 5%;
  }
</style>

