<script>
import pageTitleRule from './page-title-rule.vue'
export default {
  name: 'PageTitle',
  components: { pageTitleRule },
}
</script>

<template>
  <div class="mb-6">
    <h1 class="text-header-1 text-color-header font-semibold font-serif">
      <slot></slot>
    </h1>
    <page-title-rule></page-title-rule>
  </div>
</template>
