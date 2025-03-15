<template>
  <div>
    <!-- Header section -->
    <TopNavBar />

    <section class="fruit_section">
      <div class="container">
        <h3 class="title">Discussion Forum</h3>

        <div class="create-post">
          <!-- <input v-model="newPost.title" placeholder="Post title" class="input" /> -->
          <!-- <vue-editor v-model="newPost.content" :editorToolbar="customToolbar" class="mb-3" placeholder="Post content" /> -->
          <!-- <button @click="createPost" class="btn">Create Post</button> -->
          <a href="http://localhost:1027/InformationPortal/login" target="_blank" >
            Create Post
                  </a>
        </div>

        <div class="post-list">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <h2>{{ post.title }}</h2>
            <div v-html="post.content"></div>
            <small>
              <p>{{ post.postedby || "Unknown User" }}</p>
              {{ formatDate(post.createdAt) }}
            </small>
            <link @click="viewReplies(post.id)" >
              View Replies ({{ post.Replies.length || 0 }})
          </link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import io from "socket.io-client";
import TopNavBar from "./core/Navbar.vue";
import Footer from "./core/Bottombar.vue";

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
        ["link"],
        [{ align: [] }]
      ],
      posts: [], // List of posts
      newPost: { title: "", content: "" },
      currentPost: {},
      replies: [],
      newReply: { content: "" },
      socket: null,
      showReplies: false
    };
  },
  created() {
    this.fetchPosts();
    this.setupWebSocket();
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(`${axios.defaults.baseURL}/forum/posts`);
        this.posts = response.data || [];
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async createPost() {
      if (!this.newPost.title.trim() || !this.newPost.content.trim()) return;

      try {
        const response = await axios.post(`${axios.defaults.baseURL}/forum/posts`, this.newPost);
        this.posts.unshift(response.data); // Add new post at the top
        this.newPost = { title: "", content: "" }; // Clear input fields
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    async createReply({ commit }, { postId, content }) {
  try {
    const response = await axios.post(`/forum/replies/${postId}`, { content }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Reply created:", response.data);

    // Commit to Vuex store
    commit("ADD_REPLY", response.data);
  } catch (error) {
    console.error("Error creating reply:", error.response ? error.response.data : error.message);
  }
},

    formatDate(dateString) {
      if (!dateString) return "Unknown Date";
      return new Date(dateString).toLocaleString();
    },
    // Toggle replies visibility for individual posts
  viewReplies(postId) {
    // Toggle visibility for the specific post
    this.$set(this.repliesVisibility, postId, !this.repliesVisibility[postId]);
  },
    setupWebSocket() {
      this.socket = io(`${axios.defaults.baseURL}`);

      this.socket.on("newReply", (newReply) => {
        if (this.posts.some(post => post.id === newReply.post_id)) {
          this.posts.forEach(post => {
            if (post.id === newReply.post_id && !post.Replies.some(reply => reply.id === newReply.id)) {
              post.Replies.push(newReply);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.title {
  color: rgb(37, 91, 48) !important;
  text-align: center;
}
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.create-post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.input, .textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.btn {
  background: rgb(37, 91, 48) !important;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.post-list {
  margin-top: 20px;
}
.post-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: white;
  word-wrap: break-word;
}
.view-replies {
  background: rgb(37, 91, 48) !important;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
.fruit_section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}
</style>
