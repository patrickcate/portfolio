<script>
export default {
  name: 'TheLogo',
}
</script>

<template>
  <nuxt-link to="/" class="flex items-center">
    <svg-icon name="logo" class="w-16 h-16 mr-3" role="presentation" />
    <div class="flex flex-col">
      <div
        class="font-serif font-semibold text-color-header text-header-3 sm:text-header-5 md:text-header-3 leading-5 sm:leading-5 md:leading-5 mt-2"
        >Patrick Cate</div
      >
      <div
        class="text-primary text-body-2 sm:text-body-1 md:text-body-2 font-medium leading-6"
        ><span class="sr-only">I am a </span>Designer + Developer</div
      >
    </div>
  </nuxt-link>
</template>
