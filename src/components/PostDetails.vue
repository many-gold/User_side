<!-- src/components/PostDetails.vue -->
<template>
  <div>
        <!-- Header section -->
        <TopNavBar />
  
        <section class="fruit_section">
  <div class="post-container">
    <div class="input-group">
    <button @click="$router.go(-1)" class="back-btn">⬅ Back to Posts</button>
  </div>
    <h1 class="title">Discussion Forum</h1>
    <!-- Post Content -->
    <div class="post-content">
      <h1>{{ currentPost.title }}</h1>
      <div v-html="currentPost.content"></div>
      <!-- <p>{{ currentPost.content }}</p> -->
    </div>

    <!-- Replies Section -->
    <div class="replies-section">
      <button @click="toggleReplies" class="toggle-replies">
        {{ showReplies ? "Hide Replies" : `View Replies (${replies.length})` }}
      </button>

      <!-- Replies List -->
      <div v-if="showReplies" class="replies-list">
        <div v-for="reply in replies" :key="reply.id" class="reply-card">
          <!-- <p>{{ reply.content }}</p> -->
          <div v-html="reply.content"></div>
          <small>{{ formatDate(reply.createdAt) }}</small>
        </div>
      </div>

      <!-- Add Reply Form -->
      <div class="create-reply">
        <!-- <textarea v-model="newReply.content" placeholder="Write a reply..."></textarea> -->
        <vue-editor v-model="newReply.content" :editorToolbar="customToolbar" class="mb-3"/>
        <button @click="createReply">Add Reply</button>
      </div>
    </div>
  </div>
  </section>
  <Footer />
  </div>
</template>

  
  <script>
import { VueEditor } from "vue2-editor";
import axios from 'axios';
import { io } from "socket.io-client";
import TopNavBar from './core/Navbar.vue';
import Footer from './core/Bottombar.vue';
export default {
  components: {
        TopNavBar,
        Footer,
        VueEditor
    },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],  // Add "image" button
        [{ align: [] }],  // This enables text alignment, including images
      ],
      currentPost: {},
      replies: [],
      newReply: { content: '' },
      socket: null,
      showReplies: false, // Controls the visibility of replies
    };
  },
  created() {
    this.fetchPostDetails();
    this.setupWebSocket();
  },
  methods: {
    async fetchPostDetails() {
      try {
        const response = await axios.get(`http://localhost:3001/forum/posts/${this.$route.params.postId}`);
        this.currentPost = response.data;
        this.replies = response.data.Replies || []; // Ensure replies are correctly fetched
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    },
    async createReply() {
      if (!this.newReply.content.trim()) return; // Prevent empty replies

      try {
        await axios.post(
          `http://localhost:3001/forum/replies/${this.$route.params.postId}`,
          { content: this.newReply.content }
        );

        this.newReply.content = ''; // Clear input field
        await this.fetchPostDetails(); // Refresh replies to prevent duplication
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    toggleReplies() {
      this.showReplies = !this.showReplies;
    },
    setupWebSocket() {
      this.socket = io('http://localhost:3001/forum');
      this.socket.on('newReply', (newReply) => {
        if (newReply.post_id == this.$route.params.postId) {
          if (!this.replies.some(reply => reply.id === newReply.id)) {
            this.replies.push(newReply);
          }
        }
      });
    }
  }
};
</script>

  <style scoped>
  .title {
  color: rgb(37, 91, 48) !important;
}
.post-container {
  /* max-width: 800px; Set the maximum width to 800px */
  width: 80%; /* Make it responsive, but restrict to 800px */
  margin: auto; /* Center the container horizontally */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: center; /* Vertically center content */
  align-items: center; /* Horizontally center content */
  height: 100%; /* Ensure it fills the parent container */
}

.fruit_section{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertically center the content */
  align-items: center; /* Horizontally center the content */
  padding: 10px;
  margin-top: 5% !important;
}

.back-btn {
  padding: 10px;
  background: rgb(37, 91, 48) !important;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px; /* Add margin for spacing */
}

.post-content {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* Make the content take full width */
  max-width: 80%; /* Optional max width for better readability */
}

.replies-section {
  margin-top: 20px;
  width: 100%; /* Ensure the replies section is aligned properly */
}

.toggle-replies {
  background: rgb(37, 91, 48) !important;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
  width: 15%; /* Make the button span the full width */
}

.replies-list {
  margin-top: 10px;
}

.reply-card {
  background: #e9ecef;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.create-reply {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 15px;
  width: 100%; /* Ensure the reply section is full-width */
}

.create-reply textarea {
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.create-reply button {
  padding: 8px;
  background: rgb(37, 91, 48) !important;
  color: white;
  border: none;
  cursor: pointer;
  width: 10%; /* Make the button span the full width */
}

  </style>
  