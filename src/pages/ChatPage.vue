<template>
  <q-layout view="hHh LpR lFf">
    <!-- Navbar -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-pa-none sf-pro-700" style="text-align: center;">
          Chat Name
        </q-toolbar-title>

        <q-btn dense flat round icon="settings" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>


    <!-- Left Drawer -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-dark sf-pro-600">
      <q-input
        dense
        debounce="300"
        placeholder="Search..."
        v-model="searchQuery"
        class="search-input q-ma-md"
        rounded
        outlined
        clearable
        bg-color="white"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list bordered>
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
            <q-btn flat round dense icon="sms" color="white" @click="sendMessage" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Right Drawer -->
  <q-drawer
  show-if-above
  v-model="rightDrawerOpen"
  side="right"
  bordered
  class="bg-dark sf-pro-500"
  >
    <q-list class="q-pa-md">
      <q-item-label header class="text-white q-mb-md">Settings</q-item-label>

      <q-item clickable v-ripple class="q-mb-sm">
        <q-item-section avatar>
          <q-icon name="person" color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white">Profile</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="q-mb-sm">
        <q-item-section avatar>
          <q-icon name="notifications" color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white">Notifications</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="q-mb-sm">
        <q-item-section avatar>
          <q-icon name="security" color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white">Privacy</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="q-mb-sm">
        <q-item-section avatar>
          <q-icon name="help" color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white">Help & Feedback</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

    <q-page-container>
      <q-page dark class="bg-dark text-white sf-pro-500">
        <div class="chat-container">
          <!-- Chat messages -->
          <div class="chat-messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['chat-message', message.from]"
              :style="{ 'justify-content': message.from === 'me' ? 'flex-end' : 'flex-start' }"
            >
              <div class="bubble">
                <span>{{ message.text }}</span>
              </div>
            </div>
          </div>

           <!-- Chat input -->
          <div class="chat-input-bar">
            <q-input rounded standout="true" v-model="text" class="sf-pro-500" bg-color="grey-9" text-color="grey-5" dense @keyup.enter="sendMessage">
              <template v-slot:append>
                <q-btn flat round dense icon="arrow_upward" color="dark" @click="sendMessage" />
              </template>
            </q-input>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const isSmallScreen = ref(false)
    const searchQuery = ref('')

    const checkScreenSize = () => {
      isSmallScreen.value = $q.screen.lt.sm
    }

    onMounted(() => {
      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize)
    })

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      isSmallScreen,
      searchQuery,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },

  data() {
    return {
      text: '',
      messages: [
        { text: 'Hello! How are you?', from: 'other' },
        { text: "I'm good, thanks for asking!", from: 'me' },
        { text: "Just working on a school project. It's a web app.", from: 'me' },
        { text: 'Nice! What’s it about?', from: 'other' },
        { text: "It's a single-page chat app using Vue.js and Quasar for the frontend.", from: 'me' },
        { text: 'I’m using Node.js with Socket.IO for real-time messaging.', from: 'me' },
        { text: 'That’s cool! Is it working?', from: 'other' },
        { text: 'Yeah, mostly. I still need to refine some parts and add authentication with JWT.', from: 'me' },
        { text: 'Authentication sounds tricky.', from: 'other' },
        { text: "It is, but once it's done, it'll feel more polished.", from: 'me' },
        { text: 'What else do you need to add?', from: 'other' },
        { text: "Just a few more features like group chats. I'm keeping it simple for now.", from: 'me' },
        { text: 'Good plan. When’s it due?', from: 'other' },
        { text: 'Two weeks! Trying to finish the main parts this week.', from: 'me' },
        { text: 'Good luck! You’ve got this.', from: 'other' },
        { text: 'Thanks! I might need some testers soon.', from: 'me' },
        { text: 'Count me in!', from: 'other' }
      ],

      groups: [
        { id: 1, name: 'vpwa team' },
        { id: 2, name: 'Family' },
        { id: 3, name: 'Friends' },
        { id: 4, name: 'Work' },
        { id: 5, name: 'School' },
        { id: 6, name: 'Skuska af adg ad g ad hg adh a a hwh ' }
      ]
    }
  },

  methods: {
    truncateText(text) {
      const maxTextLength = 18
      if (text.length > maxTextLength) {
        return text.substring(0, maxTextLength) + '...'
      }
      return text
    },

    sendMessage() {
      if (this.text.trim() !== '') {
        this.messages.push({ text: this.text, from: 'me' })
        this.text = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
