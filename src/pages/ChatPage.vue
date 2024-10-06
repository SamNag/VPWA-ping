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
        
        <!-- Invitation item -->
        <q-item clickable v-ripple class="text-white sf-pro-600">
          <q-item-section avatar>
            <q-icon name="mail" color="secondary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Invitation to Join</q-item-label>
            <q-item-label >From: John Doe</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row items-center">
              <q-btn flat round dense icon="check" color="positive" size="sm" class="q-mr-xs" />
              <q-btn flat round dense icon="close" color="negative" size="sm" />
            </div>
          </q-item-section>
        </q-item>

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
    class="bg-dark"
    >
      <q-list class="q-pa-md">
        <div class="text-center q-mt-lg">
          <q-avatar size="150px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-item-label header class="text-white text-h6 q-mb-md">Channel Info</q-item-label>
        </div>

        <q-item class="q-mb-xs">
          <q-item-section avatar>
            <q-icon :name="currentChannel.isPublic ? 'public' : 'lock'" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">{{ currentChannel.name }}</q-item-label>
            <q-item-label caption class="text-grey-5">
              {{ currentChannel.isPublic ? 'Public' : 'Private' }} Channel
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="group" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">{{ currentChannel.memberCount }} members</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="grey-7" class="q-my-md" />

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

    <!-- Main Content -->
    <q-page-container>
      <q-page dark class="bg-dark text-white sf-pro-500">
        <div class="chat-container">
    <div class="chat-messages q-pa-md">
      <template v-for="(message, index) in messages" :key="index">
        <!-- Date Divider -->
        <div v-if="shouldShowDateDivider(index)" class="text-center q-my-md">
          <q-chip outline color="grey">
            {{ formatDate(message.timestamp) }}
          </q-chip>
        </div>
        <!-- Message block -->
        <div class="message-group" :class="{'new-group': shouldShowUsername(index)}">
          <!-- Avatar -->
          <q-avatar v-if="shouldShowUsername(index)" size="36px" class="q-mr-sm">
            <img :src="message.avatar">
          </q-avatar>
          <div class="message-content">
            <!-- Show username and timestamp only if required -->
            <div v-if="shouldShowUsername(index)" class="row items-center q-gutter-x-sm">
              <span class="text-weight-bold">{{ message.username }}</span>
              <span class="text-caption text-grey">{{ formatTime(message.timestamp) }}</span>
            </div>
            <!-- Message Text -->
            <div class="message-text">{{ message.text }}</div>
          </div>
        </div>
      </template>
    </div>
    <!-- Chat input -->
    <div class="chat-input-bar q-pa-md">
      <q-input 
        v-model="newMessage" 
        @keyup.enter="sendMessage"
        outlined 
        rounded
        bg-color="grey-9"
        placeholder="Type a message..."
      >
        <template v-slot:after>
          <q-btn round flat icon="send" @click="sendMessage" />
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
import { useQuasar, date } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const isSmallScreen = ref(false)
    const searchQuery = ref('')
    const newMessage = ref('')

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

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      isSmallScreen,
      searchQuery,
      newMessage,
      toggleLeftDrawer,
      toggleRightDrawer
    }
  },

  data() {
    return {
      messages: [
        {
          id: 1,
          username: 'Alice',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          text: "Hey everyone! How's the project coming along?",
          timestamp: new Date('2023-04-10T09:00:00')
        },
        {
          id: 2,
          username: 'Bob',
          avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
          text: 'Making good progress! Just finished the login page.',
          timestamp: new Date('2023-04-10T09:05:00')
        },
        {
        id: 3,
        username: 'Alice',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
        text: 'Great job, Bob! Can you share a screenshot?',
        timestamp: new Date('2023-04-10T09:07:00')
      },
      {
        id: 4,
        username: 'Charlie',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
        text: "I've been working on the database schema. Need some input on the user table.",
        timestamp: new Date('2023-04-11T10:00:00')
      },
      {
        id: 5,
        username: 'Bob',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
        text: "Sure thing, Alice! I'll post it in a bit.",
        timestamp: new Date('2023-04-11T10:15:00')
      }
      ],
      groups: [
        { id: 1, name: 'VPWA Team' },
        { id: 2, name: 'Family' },
        { id: 3, name: 'Friends' },
        { id: 4, name: 'Work' },
        { id: 5, name: 'School' },
        { id: 6, name: 'Skuska af adg ad g ad hg adh a a hwh ' }
      ],
      currentChannel: {
        name: 'VPWA Team',
        isPublic: false,
        memberCount: 5,
      }
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
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          id: this.messages.length + 1,
          username: 'You',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          text: this.newMessage,
          timestamp: new Date() // current time
        });
        this.newMessage = ''; // Clear the input field
      }
    },

    shouldShowUsername(index) {
      if (index === 0) return true; // Always show username for the first message
      const currentMessage = this.messages[index];
      const previousMessage = this.messages[index - 1];

      // Check if the current message is from a different user or has a time difference greater than 5 minutes
          return currentMessage.username !== previousMessage.username ||
                date.getDateDiff(currentMessage.timestamp, previousMessage.timestamp, 'minutes') > 5;
    },


    shouldShowDateDivider(index) {
      if (index === 0) return true; // Always show date for the first message
      const currentMessage = this.messages[index];
      const previousMessage = this.messages[index - 1];
      // Show date divider only if the current message is from a different day
      return !date.isSameDate(currentMessage.timestamp, previousMessage.timestamp, 'day');
    },

    formatDate(timestamp) {
      return date.formatDate(timestamp, 'MMMM D, YYYY')
    },

    formatTime(timestamp) {
      return date.formatDate(timestamp, 'h:mm A')
    },
  }
}
</script>

<style scoped>
.message-group {
  display: flex;
  margin-top: 30px;
  margin-bottom: 4px;
}

.message-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

</style>
