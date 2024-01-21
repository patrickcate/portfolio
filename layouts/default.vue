<script>
export default {
  name: 'DefaultLayout',
}
</script>
<template>
  <div>
    <div class="grid-container">
      <the-header class="header"></the-header>
      <Nuxt class="main" />
      <the-footer class="footer mt-4"></the-footer>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<style lang="scss">
@layer base {
  html {
    text-size-adjust: 100%;
  }

  p {
    @apply mb-6;
  }
}

.grid-container {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: 1fr;
  gap: 1.5rem 1.5rem;
  max-width: 1280px;
  min-height: 100vh;
  padding: 1.5rem;
  margin-right: auto;
  margin-left: auto;
}

.header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.main {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

.footer {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
}

.skip-link {
  @apply focus:text-white focus:bg-primary font-semibold text-center underline p-3;
}

.skip-link:focus {
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: unset;
  border: none;
}

.text-wrap-balance {
  text-wrap: balance;
}

.text-wrap-pretty {
  text-wrap: pretty;
}
</style>
