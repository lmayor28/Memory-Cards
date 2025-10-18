<script>
import CNavbar from './components/CNavbar.vue';
import CFooter from './components/CFooter.vue';

export default {
  components: {
    CNavbar,
    CFooter
  }
}
</script>

<template>
    <CNavbar />
  <main>
    <router-view />
  </main>
    <CFooter />

</template>


