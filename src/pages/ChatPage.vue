<template>
  <q-page dark class="bg-dark text-white">
    <div class="chat-container">
      <!-- Chat messages -->
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index"
             :class="['chat-message', message.from]"
             :style="{ 'justify-content': message.from === 'me' ? 'flex-end' : 'flex-start' }">
          <div class="bubble">
            <span>{{ message.text }}</span>
          </div>
        </div>
      </div>

      <!-- Footer with message input -->
      <q-footer elevated class="bg-dark q-pa-sm sf-pro-500 ">
        <q-input
          rounded
          standout = "true"
          v-model="text"
          class="sf-pro-500"
          bg-color="grey-9"
          text-color="grey-5"
          dense
        >
          <template v-slot:append>
            <q-btn
              flat
              round
              dense
              icon="send"
              color="dark"
              @click="sendMessage"
            />
          </template>
        </q-input>
      </q-footer>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      messages: [
        { text: 'Hello! How are you?', from: 'other' },
        { text: 'I\'m good, thanks for asking!', from: 'me' },
        { text: 'What are you up to today?', from: 'other' },
        { text: 'Just working on some projects. You?', from: 'me' },
        { text: 'Same here, trying to finish up before the weekend.', from: 'other' }

      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.text.trim() !== '') {
        this.messages.push({ text: this.text, from: 'me' }); // Add the user's message
        this.text = ''; // Clear the input after sending
      }
    }
  }
};
</script>

<style>
.chat-container {
  height: 100vh; /* Full height for the chat container */
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto; /* Allow scrolling for messages */
  padding: 1rem;
}

.chat-message {
  display: flex;
  margin-bottom: 0.5rem; /* Space between messages */
}

.bubble {
  max-width: 70%; /* Limit bubble width */
  padding: 5px 12px;
  border-radius: 20px;
  color: white; /* Text color inside bubbles */
}

.chat-message.me .bubble {
  background-color: #218aff; /* Blue for messages from me */
  align-self: flex-end; /* Align right */
}

.chat-message.other .bubble {
  background-color: #6e6e6e; /* Gray for messages from the other person */
  align-self: flex-start; /* Align left */
}
</style>
