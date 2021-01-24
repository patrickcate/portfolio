<script>
export default {
  name: 'TimelineListEntry',
}
</script>

<template>
  <li class="timeline-entry grid gap-6">
    <div class="text-right hidden md:block"
      ><span class="hidden md:block"><slot name="date"></slot></span
    ></div>
    <div class="justify-self-center"
      ><div
        class="w-5 h-5 bg-white relative border-primary rounded-full border-4"
      ></div
    ></div>
    <div class="">
      <div class="text-left md:hidden mb-2"><slot name="date"></slot></div>
      <div v-if="$slots.title" class="text-primary font-semibold"
        ><slot name="title"></slot
      ></div>
      <div v-if="$slots.subtitle" class="font-semibold text-color-header mt-2"
        ><slot name="subtitle"></slot
      ></div>
      <div v-if="$slots.default"><slot></slot></div>
    </div>
  </li>
</template>

<style lang="postcss">
.timeline-entry {
  grid-template-columns: theme('width.8') 1fr;

  @screen md {
    grid-template-columns: theme('width.28') theme('width.10') 1fr;
  }
}
</style>
