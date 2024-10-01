<template>
  <q-page class="flex bg-dark">
    <q-list bordered>
      <!-- Online Users -->
      <q-item v-for="user in users" :key="user.id" class="text-white sf-pro-600" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" class="q-mb-xs sf-pro-400 inset-shadow-down">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="online-status online"></div> <!-- Online indicator -->
        </q-item-section>
      </q-item>

      <q-separator color="grey-8" />
      <q-item-label header class="text-accent">Offline</q-item-label>

      <!-- Offline Users -->
      <q-item v-for="offlineuser in offline" :key="offlineuser.id" class="text-white sf-pro-400 " clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" class="q-mb-xs inset-shadow-down">
            {{ offlineuser.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ offlineuser.name }}</q-item-label>
          <q-item-label caption lines="1">{{ offlineuser.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="online-status offline"></div> <!-- Offline indicator -->
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

const users = [ {
  id: 1,
  name: 'Stefan Praca',
  letter: 'R'
}, {
  id: 2,
  name: 'Milan Pernik',
}, {
  id: 3,
  name: 'Peter Klima',
}, {
  id: 4,
  name: 'Imrich Lesik',
} ]

const offline = [ {
  id: 5,
  name: 'Martin Bulica',
}, {
  id: 6,
  name: 'Roman Zapotocny',
},
  {
    id: 7,
    name: 'Jozef Kral',
  }
]

export default {
  setup () {
    return {
      users,
      offline
    }
  }
}

</script>


<style scoped>
.custom-separator .q-list__separator {
  border-color: red !important; /* Change this to any color */
}
</style>



