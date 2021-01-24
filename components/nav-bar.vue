<script>
export default {
  name: 'NavBar',
  data() {
    return {
      menu: [],
    }
  },
  async fetch() {
    const { menu } = await this.$content('menu').fetch()
    this.menu = menu
  },
}
</script>

<template>
  <nav class="nav-bar hidden sm:block" role="navigation">
    <ul class="grid auto-cols-auto grid-flow-col">
      <li
        v-for="(link, index) in menu"
        :key="link.name"
        class="flex items-center"
      >
        <nuxt-link
          :to="link.url"
          :exact="link.name === 'Home'"
          class="text-color-body hover:text-primary font-normal no-underline hover:underline active:underline underline-offset hover:transition-colors"
          >{{ link.name }}</nuxt-link
        >
        <div
          v-if="index < menu.length - 1"
          class="bg-neutral-4 mx-5 w-2px h-4 transform -skew-x-30"
        ></div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.nav-bar {
  .link--is-active,
  .exact-link--is-active {
    @apply text-primary hover:text-primary-7 active:text-primary-7 font-semibold underline;

    text-decoration-thickness: 2px;
  }
}
</style>
