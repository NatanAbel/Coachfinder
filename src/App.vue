<template>
  <background-app></background-app>
  <div class="app">
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import BackgroundApp from './components/layout/BackgroundApp.vue';
export default {
  components: {
    TheHeader,
    BackgroundApp,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  watch: {
    didAutoLogout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
  /* outline: 1px solid green; */
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

html, body {
  max-width: 100%;
  overflow-x: hidden;
  /* background-color: #ffffff; */
  margin: 0 ;
  padding: 0;
}

.app {
  position: relative;
  /* background-color: #ffffff; */
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>


