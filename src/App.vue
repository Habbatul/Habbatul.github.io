<template>
  <Main>
    <router-view/>
  </Main>
</template>

<script>
import Main from './components/main/Main.vue';

export default {
  name: 'App',
  components: {
    Main,
  },
};
</script>
