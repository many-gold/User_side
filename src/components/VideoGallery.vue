<template>
  <div>
    <!-- Header section -->
    <TopNavBar />
    <section class="fruit_section zindex-5 min-vh-100">
      <div class="container">
        <h2 class="gallery_heading mt-3 text-center">Video Gallery</h2>

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
              v-for="(video, index) in filterTable"
              :key="index"
              class="video-frame"
              @click="viewVideo(index)"
            >
              <!-- Use the correct <video> tag -->
              <video :src="getVideo(video.filelocation)" controls width="100%" height="auto"  controlsList="nodownload" 
    @contextmenu.prevent ></video>
              <p class="caption">{{ video.caption }}</p>
            </div>
          </div>

          <!-- Modal for displaying selected video with navigation -->
          <div v-if="selectedVideo !== null" class="modal" @click.self="closeModal">
            <button class="nav-button prev" @click.stop="prevVideo">❮</button>
            <div class="video-index">
              <h1 class="modal-caption">{{ selectedVideo + 1 }} / {{ filterTable.length }}</h1>
            </div>
            <video 
              :src="getVideo(filterTable[selectedVideo].filelocation)" 
              controls 
              autoplay 
              width="80%"
              height="auto"
            ></video>
            <button class="nav-button next" @click.stop="nextVideo">❯</button>
            <p class="modal-caption">{{ filterTable[selectedVideo].caption }}</p>
          </div>
        </template>
      </div>
    </section>
    <Footer />
  </div>
</template>



<script>
import TopNavBar from './core/Navbar.vue';
import Footer from './core/Bottombar.vue';
import axios from 'axios';

export default {
  components: { 
    TopNavBar,
    Footer
  },
  data() {
    return {
      videoList: [], // Rename to avoid conflict
      filter: '',
      selectedVideo: null,
    };
  },
  mounted() {
    this.getAllVideoGallery();
  },
  methods: {
    getAllVideoGallery() {
      this.$store.dispatch('getAllVideoGallery')
        .then(response => {
          this.videoList = response.data.recordset;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getVideo(filelocation) {
      return `${axios.defaults.baseURL}/static/VideoGallery/${filelocation}`;
    },
    viewVideo(index) {
      this.selectedVideo = index;
    },
    closeModal() {
      this.selectedVideo = null;
    },
    nextVideo() {
      if (this.selectedVideo !== null) {
        this.selectedVideo = (this.selectedVideo + 1) % this.videoList.length;
      }
    },
    prevVideo() {
      if (this.selectedVideo !== null) {
        this.selectedVideo = (this.selectedVideo - 1 + this.videoList.length) % this.videoList.length;
      }
    },
  },
  computed: {
    filterTable() {
      if (!this.filter) return this.videoList;
      return this.videoList.filter((video) =>
        video.caption.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
 
@import '../assets/css/bootstrap.css';
@import '../assets/css/responsive.css';
@import '../assets/css/style.css';

/* Gallery Container and No Content Section */
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

/* Gallery Layout */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 15px;
  justify-items: center;
}

.video-frame {
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.video-frame:hover {
  transform: scale(1.05);
}

.video-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.caption {
  display: none; /* Hide caption by default */
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
}

/* Modal Styles */
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

.modal video {
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

.video-index {
  color: white;
  font-size: 18px;
  margin-bottom: 15px;
}

/* Navigation Buttons */
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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .video-frame {
    width: 100%;
    height: 250px;
  }

  .modal video {
    max-width: 90%;
  }
}
.fruit_section{
    margin-top: 5%;
  }
</style>

