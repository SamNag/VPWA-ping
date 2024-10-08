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
          <!-- Chat messages -->
          <div class="chat-messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['chat-message', message.from === 'me' ? 'me' : 'other']"
              :style="{ 'justify-content': message.from === 'me' ? 'flex-end' : 'flex-start' }"
            >
              <!-- Date Divider -->
              <div v-if="shouldShowDateDivider(index)" class="date-divider">
                <span>{{ formatDate(message.timestamp) }}</span>
                <hr />
              </div>
              
              <div class="message-header">
                <span class="sender">{{ message.from === 'me' ? 'You' : message.from }}</span>
                <span class="time">{{ formatTime(message.timestamp) }}</span>
              </div>
              <div class="bubble">
                <div>
                  <span>{{ message.text }}</span>
                </div>
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
import { useQuasar} from 'quasar'

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

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

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
      },
      formatTime
    }
  },

  data() {
    return {
      text: '',
      messages: [
        { text: 'Hello! How are you?', from: 'Joe', timestamp: new Date('2023-05-15T14:00:00') },
        { text: "I'm good, thanks for asking!", from: 'me', timestamp: new Date('2023-05-15T14:01:00') },
        { text: "Just working on a school project. It's a web app.", from: 'me', timestamp: new Date('2023-05-15T14:01:30') },
        { text: "Nice! What's it about?", from: 'Sarah', timestamp: new Date('2023-05-15T14:02:15') },
        { text: "It's a single-page chat app using Vue.js and Quasar for the frontend.", from: 'me', timestamp: new Date('2023-05-15T14:03:00') },
        { text: "I'm using Node.js with Socket.IO for real-time messaging.", from: 'me', timestamp: new Date('2023-05-15T14:03:30') },
        { text: "That's cool! Is it working?", from: 'Sarah', timestamp: new Date('2023-05-15T14:04:45') },
        { text: 'Yeah, mostly. I still need to refine some parts and add authentication with JWT.', from: 'me', timestamp: new Date('2023-05-15T14:05:30') },
        { text: 'Authentication sounds tricky.', from: 'Joe', timestamp: new Date('2023-05-15T14:06:15') },
        { text: "It is, but once it's done, it'll feel more polished.", from: 'me', timestamp: new Date('2023-05-15T14:07:00') },
        { text: 'What else do you need to add?', from: 'Joe', timestamp: new Date('2023-05-15T14:08:30') },
        { text: "Just a few more features like group chats. I'm keeping it simple for now.", from: 'me', timestamp: new Date('2023-05-15T14:09:15') },
        { text: "Good plan. When's it due?", from: 'Sarah', timestamp: new Date('2023-05-15T14:10:00') },
        { text: 'Two weeks! Trying to finish the main parts this week.', from: 'me', timestamp: new Date('2023-05-15T14:10:45') },
        { text: "Good luck! You've got this.", from: 'Joe', timestamp: new Date('2023-05-15T14:11:30') },
        { text: 'Thanks! I might need some testers soon.', from: 'me', timestamp: new Date('2023-05-15T14:12:15') },
        { text: 'Count me in!', from: 'Sarah', timestamp: new Date('2023-05-15T14:13:00') }
      ],

      groups: [
        { id: 1, name: 'vpwa team' },
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
      if (this.text.trim() !== '') {
        const timestamp = Date.now(); // Get the current timestamp
        this.messages.push({
          text: this.text,
          from: 'me',
          timestamp: timestamp // Add timestamp to the message object
        });
        this.text = ''; // Clear the input
      }
    },

    shouldShowDateDivider(index) {
    if (index === 0) return true; // Always show date divider for the first message

    const currentMessage = this.messages[index];
    const previousMessage = this.messages[index - 1];

    // Show date divider only if the current message is from a different day
    return !this.isSameDate(currentMessage.timestamp, previousMessage.timestamp);
    },

    // Format timestamp into a human-readable date
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    },

    // Utility function to check if two timestamps are from the same day
    isSameDate(timestamp1, timestamp2) {
      const date1 = new Date(timestamp1);
      const date2 = new Date(timestamp2);

      // Compare year, month, and day
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
  }
}
</script>

<style scoped>
.chat-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

}

.me.chat-message{
  align-items: flex-end;
}

.message-header .sender {
  margin-right: 10px; /* Add gap between sender and timestamp */
}

.message-header{
  padding-left: 10px; /* Add gap between sender and timestamp */
  padding-right: 10px;
}

.date-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 40px 0; /* Adds vertical space around the divider */
  position: relative;
}

.date-divider span {
  padding: 0 10px;
  margin-bottom: 20px;
  font-weight: bold;
  color: grey; /* Grey font for the date */
}

.date-divider hr {
  position: absolute;
  width: 100%;
  top: 50%;
  border: none;
  border-top: 1px solid rgba(128, 128, 128, 0.5); /* Slightly transparent grey line */
}
</style>