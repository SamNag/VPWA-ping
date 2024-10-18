import { ref, nextTick, onMounted, onUnmounted, watch, Ref } from 'vue'
import { useQuasar, QNotifyCreateOptions, scroll } from 'quasar'

const { setVerticalScrollPosition } = scroll

interface Message {
  text: string
  from: string
  timestamp: Date
}

interface Group {
  id: number
  name: string
}

interface Channel {
  name: string
  isPublic: boolean
  memberCount: number
}

export default {
  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const isSmallScreen = ref(false)
    const searchQuery = ref('')
    const chatContainer: Ref<HTMLElement | null> = ref(null)
    const text = ref('')
    const isLoading = ref(false)
    const firstMessage: Ref<HTMLElement[]> = ref([])
    const observer: Ref<IntersectionObserver | null> = ref(null)
    const page = ref(1)
    const MESSAGES_PER_PAGE = 5

    const messages: Ref<Message[]> = ref([
      { text: 'Hello! How are you?', from: 'Joe', timestamp: new Date('2023-05-15T14:00:00') },
      { text: 'I\'m good, thanks for asking!', from: 'Fero', timestamp: new Date('2023-05-15T14:01:00') },
      { text: 'Just working on a school project. It\'s a web app.', from: 'Fero', timestamp: new Date('2023-05-15T14:01:30') },
      { text: 'Nice! What\'s it about? @Fero', from: 'Sarah', timestamp: new Date('2023-05-15T14:02:15') },
      { text: 'It\'s a single-page chat app using Vue.js and Quasar for the frontend.', from: 'Fero', timestamp: new Date('2023-05-15T14:03:00') },
      { text: 'I\'m using Node.js with Socket.IO for real-time messaging.', from: 'Fero', timestamp: new Date('2023-05-15T14:03:30') },
      { text: 'That\'s cool! Is it working? @Fero', from: 'Sarah', timestamp: new Date('2023-05-15T14:04:45') },
      { text: 'Yeah, mostly. I still need to refine some parts and add authentication with JWT.', from: 'Fero', timestamp: new Date('2023-05-15T14:05:30') },
      { text: 'Authentication sounds tricky.', from: 'Joe', timestamp: new Date('2023-05-15T14:06:15') },
      { text: 'It is, but once it\'s done, it\'ll feel more polished.', from: 'Fero', timestamp: new Date('2023-05-15T14:07:00') },
      { text: 'What else do you need to add?', from: 'Joe', timestamp: new Date('2023-05-15T14:08:30') },
      { text: 'Just a few more features like group chats. I\'m keeping it simple for now.', from: 'Fero', timestamp: new Date('2023-05-15T14:09:15') },
      { text: 'Good plan. When\'s it due?', from: 'Sarah', timestamp: new Date('2023-05-15T14:10:00') },
      { text: 'Two weeks! Trying to finish the main parts this week.', from: 'Fero', timestamp: new Date('2023-05-15T14:10:45') },
      { text: 'Good luck! You\'ve got this.', from: 'Joe', timestamp: new Date('2023-05-15T14:11:30') },
      { text: 'Thanks! I might need some testers soon.', from: 'Fero', timestamp: new Date('2023-05-15T14:12:15') },
      { text: 'Count me in!', from: 'Sarah', timestamp: new Date('2023-05-15T14:13:00') },
      { text: 'Me too! I\'d love to help test it out.', from: 'Joe', timestamp: new Date('2023-05-15T14:14:30') },
      { text: 'Thanks, guys! I\'ll let you know when it\'s ready for testing.', from: 'Fero', timestamp: new Date('2023-05-15T14:15:45') },
      { text: 'How\'s the UI design coming along?', from: 'Sarah', timestamp: new Date('2023-05-15T14:17:00') },
      { text: 'It\'s going well! Quasar has some great components that I\'m using.', from: 'Fero', timestamp: new Date('2023-05-15T14:18:30') },
      { text: 'That\'s great! Are you using any specific color scheme? @Fero', from: 'Joe', timestamp: new Date('2023-05-15T14:20:00') },
      { text: 'I\'m going for a dark theme with accent colors. Easier on the eyes for long chats.', from: 'Fero', timestamp: new Date('2023-05-15T14:21:15') },
      { text: 'Smart choice! Dark themes are popular these days.', from: 'Sarah', timestamp: new Date('2023-05-15T14:22:30') },
      { text: 'Definitely! How are you handling message storage?', from: 'Joe', timestamp: new Date('2023-05-15T14:24:00') },
      { text: 'I\'m using MongoDB for now. It seems to work well with Node.js.', from: 'Fero', timestamp: new Date('2023-05-15T14:25:30') },
      { text: 'Good choice! NoSQL can be great for chat applications.', from: 'Joe', timestamp: new Date('2023-05-15T14:27:00') },
      { text: 'Are you planning to implement file sharing?', from: 'Sarah', timestamp: new Date('2023-05-15T14:28:15') },
      { text: 'Not for the initial version, but it\'s on my list for future updates.', from: 'Fero', timestamp: new Date('2023-05-15T14:29:45') },
      { text: 'Sounds like you\'ve got a solid plan!', from: 'Joe', timestamp: new Date('2023-05-15T14:31:00') },
      { text: 'Thanks! It\'s been challenging but fun to work on.', from: 'Fero', timestamp: new Date('2023-05-15T14:32:30') },
      { text: 'How about emojis and reactions? Are those in the plan?', from: 'Sarah', timestamp: new Date('2023-05-15T14:34:00') },
      { text: 'Yes! I\'m including basic emoji support in the first version.', from: 'Fero', timestamp: new Date('2023-05-15T14:35:15') },
      { text: 'Nice! Emojis are essential for modern chat apps.', from: 'Joe', timestamp: new Date('2023-05-15T14:36:45') },
      { text: 'Agreed! Oh, and how\'s error handling coming along?', from: 'Sarah', timestamp: new Date('2023-05-15T14:38:00') },
      { text: 'Still working on that. Want to make sure it\'s robust before testing.', from: 'Fero', timestamp: new Date('2023-05-15T14:39:30') },
      { text: 'Smart move. Solid error handling can save a lot of headaches later.', from: 'Joe', timestamp: new Date('2023-05-15T14:41:00') }
    ])



        const groups: Ref<Group[]> = ref([
      { id: 1, name: 'vpwa team' },
      { id: 2, name: 'Family' },
      { id: 3, name: 'Friends' },
      { id: 4, name: 'Work' },
      { id: 5, name: 'School' },
      { id: 6, name: 'Skuska af adg ad g ad hg adh a a hwh ' }
    ])

    const chatUsers: Ref<Group[]> = ref([
      { id: 1, name: 'Joe', state: 'online', isAdmin: false },
      { id: 2, name: 'Sarah', state: 'online', isAdmin: false },
      { id: 3, name: 'Sam', state: 'offline', isAdmin: false },
      { id: 4, name: 'Adam', state: 'online', isAdmin: true },
      { id: 5, name: 'Fero', state: 'online', isAdmin: false }
    ])

    // Current logged-in user's profile
    const currentUser: Ref<{ id: number; name: string; state: string;}> = ref({
      id: 5,
      name: 'Fero',
      state: 'online',
    })


    const currentChannel: Ref<Channel> = ref({
      name: 'vpwa team',
      isPublic: false,
      memberCount: chatUsers.value.length
    })

    const setUserStatus = (status: string) => {
      currentUser.value.state = status
      showNotification(`You are now ${status}`, 'info')
    }

    const scrollToBottom = () => {
      nextTick(() => {
        const container = chatContainer.value
        if (container) {
          setVerticalScrollPosition(container, container.scrollHeight, 300)
        }
      })
    }

    const checkScreenSize = () => {
      isSmallScreen.value = $q.screen.lt.sm
    }

    const loadMoreMessages = async () => {
        isLoading.value = true;
    
        const container = chatContainer.value;
        if (!container) {
            console.error('Chat container not found');
            isLoading.value = false;
            return;
        }
    
        const scrollHeight = container.scrollHeight; // Current height
        const scrollTop = container.scrollTop; // Current scroll position
    
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        const newMessages: Message[] = Array.from({ length: MESSAGES_PER_PAGE }, (_, i) => ({
            text: `Loaded message ${page.value * MESSAGES_PER_PAGE - i}`,
            from: i % 2 === 0 ? 'System' : 'OldUser',
            timestamp: new Date(Date.now() - (page.value * MESSAGES_PER_PAGE - i) * 60000)
        }));
    
        // Insert new messages at the beginning
        messages.value = [...newMessages, ...messages.value];
    
        nextTick(() => {
            if (container) {
                const newScrollHeight = container.scrollHeight; 
                container.scrollTop = newScrollHeight - (scrollHeight - scrollTop);
            }
            isLoading.value = false;
        });
    
        page.value++;
    };
    

    const observeFirstMessage = () => {
      if (firstMessage.value[0]) {
        observer.value = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !isLoading.value) {
              loadMoreMessages()
            }
          },
          { threshold: 1 }
        )
        observer.value.observe(firstMessage.value[0])
      }
    }



    onMounted(() => {
      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
      scrollToBottom()
      observeFirstMessage()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize)
      if (observer.value && firstMessage.value[0]) {
        observer.value.unobserve(firstMessage.value[0])
      }
      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value)
      }
    })

    watch(() => messages.value.length, () => {
      if (!isLoading.value) {
        scrollToBottom()
      }
    })

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    const formatTime = (timestamp: Date): string => {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    const truncateText = (text: string): string => {
      const maxTextLength = 18
      if (text.length > maxTextLength) {
        return text.substring(0, maxTextLength) + '...'
      }
      return text
    }

    const handleInput = () => {
      console.log('Input received:', text.value)
      const inputText = text.value.trim()
    
      if (inputText !== '') {
        if (inputText.startsWith('/')) {
          const command = inputText.slice(1).trim().toLowerCase()
          if (!handleCommand(command)) {
            console.error('Unrecognized command:', command)
          }
        } else {
          sendMessage()  // Trigger the message sending logic
        }
        clearTypingIndicator()  // Ensure typing indicator is cleared after input
      }
    
      // Forcefully clear the input text after message handling
      text.value = ''
    }
    

    const handleCommand = (command: string): boolean => {
      console.log('Command received:', command)
      switch (command) {
        case 'quit':
          quitChat()
          return true
        case 'clear':
          clearChat()
          return true
        case 'help':
          showHelp()
          return true
        case 'list':
          showList()
          return true
        default:
          return false
      }
    }

    const quitChat = () => {
      showNotification('Quitting chat...', 'info')
      // TO DO
    }

    const clearChat = () => {
      messages.value = []
      showNotification('Chat cleared.', 'positive')
    }

    const showHelp = () => {
      showNotification(
        'Available commands:<br>/quit - Exit the chat<br>/clear - Clear chat history<br>/help - Show this help message',
        'info',
        0
      )
    }

    const showList = () => {
      const userList = chatUsers.value
        .map(user => user.name) 
        .join(', ');

      messages.value.push({
        text: `Users in chat:\n${userList}`,
        from: 'system',
        timestamp: new Date()
      });
    };




    const showNotification = (message: string, type: string = 'info', timeout: number = 0) => {
      console.log('$q object:', $q)
      const notifyOptions: QNotifyCreateOptions = {
        message: message,
        position: 'top',
        color: type,
        timeout: timeout,
        actions: [{ icon: 'close', color: 'white' }]
      }
      $q.notify(notifyOptions)
    }

    const sendMessage = () => {
      if (text.value.trim() !== '') {
        const timestamp = new Date()
        messages.value.push({
          text: text.value,
          from: currentUser.value.name, // Use current user's name
          timestamp: timestamp
        })
        text.value = ''
        scrollToBottom()
      }
    }

    const shouldShowDateDivider = (index: number): boolean => {
      if (index === 0) return true

      const currentMessage = messages.value[index]
      const previousMessage = messages.value[index - 1]

      return !isSameDate(currentMessage.timestamp, previousMessage.timestamp)
    }

    const formatDate = (timestamp: Date): string => {
      return timestamp.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const isSameDate = (timestamp1: Date, timestamp2: Date): boolean => {
      return (
        timestamp1.getFullYear() === timestamp2.getFullYear() &&
        timestamp1.getMonth() === timestamp2.getMonth() &&
        timestamp1.getDate() === timestamp2.getDate()
      )
    }

    

    const isTyping = ref(false)
    const isTypingExpanded = ref(false)
    const typingTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

    const TYPING_TIMEOUT = 5000 // 30 seconds in milliseconds

    const handleTyping = () => {

    
      console.log('Handle typing:')
      isTyping.value = true
    
      // Clear existing timeout
      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value)
      }
    
      // Set new timeout
      typingTimeout.value = setTimeout(() => {
        isTyping.value = false
        isTypingExpanded.value = false
      }, TYPING_TIMEOUT)
    }
    

    const toggleTypingExpansion = () => {
      isTypingExpanded.value = !isTypingExpanded.value
    }

    const clearTypingIndicator = () => {
      console.log('Clearing typing indicator')  // Debug log to check if it's called
      isTyping.value = false  // Reset the typing state
      isTypingExpanded.value = false  // Reset the expanded typing state
    
      // Clear the timeout that controls the typing indicator
      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value)
        typingTimeout.value = null
      }
    }
    
    

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      isSmallScreen,
      searchQuery,
      chatContainer,
      messages,
      groups,
      currentChannel,
      text,
      isLoading,
      firstMessage,
      toggleLeftDrawer,
      toggleRightDrawer,
      formatTime,
      truncateText,
      handleInput,
      sendMessage,
      shouldShowDateDivider,
      formatDate,
      currentUser,
      setUserStatus,
      isTyping,
      isTypingExpanded,
      handleTyping,
      toggleTypingExpansion,
      clearTypingIndicator,
    }
  },
}
