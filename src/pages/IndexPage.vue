<template>
  <q-layout view="hHh lpr lFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>


    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-page class="flex bg-dark">
        <q-list bordered style="min-width: 280px;">
          <!-- chat groups -->
          <q-item v-for="group in groups" :key="group.id" class="text-white sf-pro-600" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="secondary" text-color="white" class="q-mb-xs sf-pro-400 inset-shadow-down">
                {{ group.name.charAt(0).toUpperCase() }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ truncateText(group.name) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                round
                dense
                icon="sms"
                color="white"
                @click="sendMessage"
              />
            </q-item-section>
          </q-item>

          <q-separator color="grey-8" />
        </q-list>
      </q-page>    </q-drawer>

    <q-page-container>
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

        </div>
      </q-page>
    </q-page-container>

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

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      groups,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  methods: {
    truncateText(text) {
      if (text.length > maxTextLength) {
        return text.substring(0, maxTextLength) + '...';
      }
      return text;
    },

    sendMessage() {
      if (this.text.trim() !== '') {
        this.messages.push({ text: this.text, from: 'me' }); // Add the user's message
        this.text = ''; // Clear the input after sending
      }
    }
  },
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
}



const groups = [ {
  id: 1,
  name: 'vpwa team',
}, {
  id: 2,
  name: 'Family',
}, {
  id: 3,
  name: 'Friends',
}, {
  id: 4,
  name: 'Work',
},
  {
    id: 5,
    name: 'School',
  },
  {
    id: 5,
    name: 'Skuska af  adg ad g ad hg adh a  a hwh ',
  }
]

const maxTextLength = 18;





</script>
