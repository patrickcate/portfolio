<script>
import theLogo from './the-logo.vue'
export default {
  name: 'TheHeader',
  components: { theLogo },
}
</script>

<template>
  <header role="banner" class="flex justify-between items-center">
    <the-logo></the-logo>
    <nav-bar></nav-bar>
  </header>
</template>
