<script>
export default {
  name: 'TabBar',
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
  <nav
    class="tab-bar bg-white border-t border-neutral-4 sticky bottom-0 left-0 right-0 block sm:hidden"
  >
    <ul
      class="grid auto-cols-auto grid-flow-col divide-x divide-solid divide-neutral-4"
    >
      <li v-for="link in menu" :key="link.name" class="flex flex-col">
        <nuxt-link
          :to="link.url"
          :exact="link.name === 'Home'"
          class="text-color-body font-normal no-underline p-2 flex flex-col items-center"
        >
          <svg-icon :name="link.name.toLowerCase()" class="w-6 h-6" />
          <div class="text-body-1">{{ link.name }}</div>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.tab-bar {
  .link--is-active,
  .exact-link--is-active {
    @apply text-white bg-primary font-semibold;
  }
}
</style>
