<template>
    <div>
        <div v-if="!selectedGroup">
            <!-- Group List View -->
            <h1>Groups</h1>
            <ul>
                <li v-for="group in groups" :key="group.id">
                    <a @click="selectGroup(group)">{{ group.name }}</a>
                </li>
            </ul>
            <form @submit.prevent="createGroup">
                <input v-model="newGroup.name" placeholder="Group Name" required />
                <textarea v-model="newGroup.description" placeholder="Group Description" required></textarea>
                <button type="submit">Create Group</button>
            </form>
        </div>
  
        <div v-else>
            <!-- Group Details View -->
            <button @click="deselectGroup">Back to Groups</button>
            <h1>{{ selectedGroup.name }}</h1>
            <p>{{ selectedGroup.description }}</p>
            <button @click="fetchPosts">Refresh Posts</button>
            <ul>
                <li v-for="post in posts" :key="post.id">
                    <strong>{{ post.user }}:</strong> {{ post.content }}
                </li>
            </ul>
            <form @submit.prevent="createPost">
                <input v-model="newPost.user" placeholder="Your Name" required />
                <textarea v-model="newPost.content" placeholder="Your Message" required></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
      data() {
          return {
              groups: [], // List of groups
              selectedGroup: null, // Currently selected group
              posts: [], // Posts for the selected group
              newGroup: { name: "", description: "" }, // New group details
              newPost: { user: "", content: "" }, // New post details
          };
      },
      created() {
          this.fetchGroups(); // Fetch groups when the component is created
      },
      methods: {
          // Fetch all groups
          fetchGroups() {
              axios.get("http://localhost:3000/api/groups").then((response) => {
                  this.groups = response.data;
              });
          },
  
          // Create a new group
          createGroup() {
              axios.post("http://localhost:3000/api/groups", this.newGroup).then(() => {
                  this.newGroup = { name: "", description: "" };
                  this.fetchGroups();
              });
          },
  
          // Select a group to view its details
          selectGroup(group) {
              this.selectedGroup = group;
              this.fetchPosts();
          },
  
          // Deselect the current group and go back to the group list
          deselectGroup() {
              this.selectedGroup = null;
              this.posts = [];
          },
  
          // Fetch posts for the selected group
          fetchPosts() {
              if (this.selectedGroup) {
                  axios
                      .get(`http://localhost:3000/api/groups/${this.selectedGroup.id}/posts`)
                      .then((response) => {
                          this.posts = response.data;
                      });
              }
          },
  
          // Create a new post in the selected group
          createPost() {
              if (this.selectedGroup) {
                  axios
                      .post(`http://localhost:3000/api/groups/${this.selectedGroup.id}/posts`, this.newPost)
                      .then(() => {
                          this.newPost = { user: "", content: "" };
                          this.fetchPosts();
                      });
              }
          },
      },
  };
  </script>
  
  <style>
 
@import '../assets/css/bootstrap.css';
@import '../assets/css/responsive.css';
@import '../assets/css/style.css';
  ul {
      list-style-type: none;
      padding: 0;
  }
  
  li {
      margin: 10px 0;
  }
  
  form {
      margin: 20px 0;
  }
  
  button {
      margin-top: 10px;
  }
  </style>
  