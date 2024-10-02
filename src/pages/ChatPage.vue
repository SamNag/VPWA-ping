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

</style>
