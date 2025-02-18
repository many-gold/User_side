<template>
  <div>
    <TopNavBar />
    <section class="discussion-section min-vh-100 py-5">
      <div class="container">
        <!-- Discussion Form -->
        <div class="row mb-5">
          <div class="col-lg-8 mx-auto">
            <div class="discussion-form card shadow-sm p-4">
              <h2 class="mb-4 text-center">Group Discussion Forums</h2>
              <form @submit.prevent="submitMessage">
                <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input
                    type="text"
                    v-model="form.name"
                    id="name"
                    class="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">Discussion Title:</label>
                  <input
                    type="text"
                    v-model="form.title"
                    id="title"
                    class="form-control"
                    placeholder="Enter a title"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">Discussion Content:</label>
                  <textarea
                    v-model="form.ContentDetail"
                    id="content"
                    class="form-control"
                    rows="5"
                    placeholder="Enter your discussion content"
                    required
                  ></textarea>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Messages List -->
        <div class="row">
          <h3 class="mb-4 text-center">Messages</h3>
          <div v-if="messages.length" class="d-flex flex-wrap gap-3">
            <div
              v-for="(message, index) in messages"
              :key="message.id"
              class="col-md-6 col-lg-4"
            >
              <div class="card message-card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">{{ message.name }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{{ message.title }}</h6>
                  <p class="card-text">{{ message.ContentDetail }}</p>
                  <button
                    class="btn btn-link p-0"
                    @click="toggleReply(index)"
                  >
                    Reply
                  </button>

                  <div v-if="message.showReplyForm" class="mt-3">
                    <textarea
                      v-model="message.replyContent"
                      class="form-control mb-2"
                      placeholder="Write a reply..."
                    ></textarea>
                    <button
                      class="btn btn-secondary btn-sm"
                      @click="submitReply(index)"
                    >
                      Submit Reply
                    </button>
                  </div>

                  <div v-if="message.replies.length" class="mt-3">
                    <h6>Replies:</h6>
                    <ul class="list-unstyled">
                      <li
                        v-for="(reply, rIndex) in message.replies"
                        :key="rIndex"
                        class="border-bottom py-1"
                      >
                        {{ reply }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="no-data">
            No messages available. Start the discussion!
          </p>
        </div>
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
    Footer,
  },
  data() {
    return {
      messages: [],
      form: {
        name: '',
        title: '',
        ContentDetail: '',
      },
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    // Fetch messages and replies from the backend
    getMessages() {
      axios
        .get('/users/messages')  // API endpoint for getting messages
        .then((response) => {
          console.log('API Response:', response);  // Verify the structure of the response
          if (response.data && response.data.recordset) {
            this.messages = response.data.recordset.map(message => ({
              ...message,
              replyContent: '',
              showReplyForm: false,
              replies: message.replies || []
            }));
          } else {
            console.error('No messages found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    },

    // Submit a new discussion message
    submitMessage() {
      axios
        .post('/users/messages', this.form)  // API endpoint to post the message
        .then(() => {
          this.getMessages();
          this.form.name = '';
          this.form.title = '';
          this.form.ContentDetail = '';
          this.$notify({
            title: 'Success',
            text: 'Message posted successfully!',
            type: 'success',
          });
        })
        .catch((error) => {
          console.error('Error posting message:', error);
          this.$notify({
            title: 'Error',
            text: 'Failed to post message. Please try again later.',
            type: 'error',
          });
        });
    },

    // Submit a reply to a specific message
    submitReply(index) {
      const reply = this.messages[index].replyContent.trim();
      if (!reply) {
        this.$notify({
          title: 'Validation Error',
          text: 'Reply cannot be empty.',
          type: 'warning',
        });
        return;
      }

      const messageId = this.messages[index].id; // Get the message ID
      const url = `/users/messages/${messageId}/reply`; // Construct the URL with ID

      axios
        .post(url, { reply })
        .then(() => {
          this.messages[index].replies.push(reply);
          this.messages[index].replyContent = '';
          this.$notify({
            title: 'Success',
            text: 'Reply submitted successfully!',
            type: 'success',
          });
        })
        .catch((error) => {
          console.error('Error submitting reply:', error);
          this.$notify({
            title: 'Error',
            text: 'Failed to submit reply. Try again later.',
            type: 'error',
          });
        });
    },

    // Toggle the visibility of the reply form for a specific message
    toggleReply(index) {
      this.messages[index].showReplyForm = !this.messages[index].showReplyForm;
    },
  },
};
</script>

<style scoped>
@import '../assets/css/bootstrap.css';
@import '../assets/css/responsive.css';
@import '../assets/css/style.css';

.message-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
}

.message-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.no-data {
  text-align: center;
  color: rgba(240, 206, 13, 0.937) !important;
  font-size: 16px;
  font-weight: 200;
}

.btn-primary,
.btn-primary:hover {
  background-color: rgb(37, 91, 48);
  border-color: rgb(37, 91, 48);
}

.btn-secondary {
  background-color: rgba(240, 206, 13, 0.937);
  border: none;
}

.btn-secondary:hover {
  background-color: rgba(200, 170, 10, 0.9);
}
.discussion-section{
    margin-top: 5%;
  }
</style>