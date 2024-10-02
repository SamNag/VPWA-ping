<template>
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
  </q-page>
</template>

<script>

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




export default {
  setup () {
    return {
      groups
    }
  },

  methods: {
    truncateText(text) {
      if (text.length > maxTextLength) {
        return text.substring(0, maxTextLength) + '...';
      }
      return text;
    }
  }
}

</script>


<style >

</style>



