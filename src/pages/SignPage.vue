<template>
  <q-page class=" window-height window-width row justify-center items-center custom-bg">
    <div class="column">
      <div class="row">
      </div>
      <div class="row">

        <q-card bordered class="q-pa-lg q-card">
          <q-card-section>
            <q-form class="q-gutter-md">
              <h5 class="text-dark sf-pro-700 cente" >Sign in </h5>
              <q-input  dense clearable rounded standout v-model="email" type="email" label="email" />
              <q-input dense clearable rounded standout v-model="password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn rounded dense color="primary" size="lg" class="full-width sf-pro-600 " label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none sf-pro-400">
            <p class="text-dark">Not reigistered? Created an Account</p>
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
      password: ''
    }
  }
}
</script>

<style>
.q-card {
  min-width: 350px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px #ffffff;
  border: white 1px solid;

}

.custom-bg {
  background-image: url('src/css/bg.png');
  background-size: cover;
  background-position: center;
}

</style>
