<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      startYear: '2009',
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>

<template>
  <footer class="prose text-body-1 text-center max-w-none" role="contentinfo">
    <small class="text-body-1 block">
      All content is copyright &copy; {{ startYear }}&ndash;{{ currentYear }}
      Patrick Cate, including all mis-spellings.
    </small>
  </footer>
</template>
