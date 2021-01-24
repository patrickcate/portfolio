<script>
export default {
  name: 'VCard',
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center text-center text-wrap-pretty"
  >
    <div class="mb-2"><slot name="media"></slot></div>
    <h2 class="text-color-header text-header-6 font-semibold"
      ><slot name="title"></slot
    ></h2>
    <hr class="w-32 h-px border-neutral-4 my-4" />
    <slot></slot>
  </div>
</template>
