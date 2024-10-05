<template>
  <q-page class="window-height window-width row justify-center items-center custom-bg">
    <div class="column q-pa-md">
      <div class="row q-col-gutter-md">
        <q-card bordered class="q-pa-lg q-card">
          <q-card-section>
            <q-form class="q-gutter-md">
              <div class="header-container">
                <h5 class="text-dark sf-pro-700 center">
                  {{ isSignUp ? 'Sign Up' : 'Sign In' }}
                </h5>
                <!-- Ping image next to the header text -->
                <img src="src/css/ping.gif" alt="Ping Animation" class="ping-image" />
              </div>

              <!-- Name, Surname, Nickname for Sign Up -->
              <q-input
                v-if="isSignUp"
                dense
                clearable
                rounded
                standout
                v-model="name"
                label="Name"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>

              <q-input
                v-if="isSignUp"
                dense
                clearable
                rounded
                standout
                v-model="surname"
                label="Surname"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-if="isSignUp"
                dense
                clearable
                rounded
                standout
                v-model="nickname"
                label="Nickname"
              >
                <template v-slot:prepend>
                  <q-icon name="tag" />
                </template>
              </q-input>

              <!-- Email Input -->
              <q-input
                dense
                clearable
                rounded
                standout
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <!-- Password Input -->
              <q-input
                dense
                clearable
                rounded
                standout
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <!-- Confirm Password for Sign Up -->
              <q-input
                v-if="isSignUp"
                dense
                clearable
                rounded
                standout
                v-model="confirmPassword"
                :type="isPwd ? 'password' : 'text'"
                label="Confirm Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <!-- Submit Button -->
          <q-card-actions class="q-px-md">
            <q-btn
              rounded
              dense
              color="primary"
              size="lg"
              class="full-width sf-pro-600"
              :label="isSignUp ? 'Sign Up' : 'Login'"
            />
          </q-card-actions>

          <!-- Toggle between Sign In and Sign Up via text -->
          <q-card-section class="text-center q-pa-none sf-pro-400">
            <p class="text-dark">
              <span @click="toggleForm" class="text-dark cursor-pointer sf-pro-600">
                {{ isSignUp ? 'Already registered? Sign in' : 'Not registered? Create an Account' }}
              </span>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'sign-page',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',       // Name field for sign-up
      surname: '',    // Surname field for sign-up
      nickname: '',   // Nickname field for sign-up
      isPwd: true,
      isSignUp: false // Flag to toggle between sign-in and sign-up
    }
  },
  methods: {
    toggleForm() {
      this.isSignUp = !this.isSignUp;
      this.resetForm(); // Reset form when toggling between sign in/sign up
    },
    resetForm() {
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.name = '';
      this.surname = '';
      this.nickname = '';
    }
  }
}
</script>

<style>
.q-card {
  width: 100%;
  max-width: 350px; /* Maximum width to make it responsive */
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px #ffffff;
  border: white 1px solid;
}

@media (max-width: 600px) {
  .q-card {
    max-width: 300px; /* Reduce card size for smaller screens */
  }
}

.custom-bg {
  background-image: url('src/css/bg.png');
  background-size: cover;
  background-position: center;
}

/* Style for the header container */
.header-container {
  display: flex; /* Use flexbox to arrange items */
  align-items: center; /* Align items vertically */
  justify-content: center; /* Center horizontally */
  margin-bottom: 10px; /* Space below header */
}

/* Style for the ping image */
.ping-image {
  width: auto; /* Maintain original width */
  height: 50px; /* Set height to 50px */
  margin-left: 10px; /* Space between text and image */
}
</style>
