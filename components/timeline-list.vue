<script>
export default {
  name: 'TimelineList',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="timeline relative">
    <div class="timeline__header grid gap-6 mb-4">
      <div class="col-start-1 col-end-2 md:col-start-1 md:col-end-3">
        <div
          class="flex bg-primary relative rounded-full justify-center items-center w-8 h-8 md:w-10 md:h-10 ml-auto"
        >
          <svg-icon
            :name="icon"
            class="w-7 h-7 text-white"
            role="presentation"
          />
        </div>
      </div>
      <h2
        class="font-serif font-semibold text-color-header text-header-3 col-start-2 col-end-3 md:col-start-3 md:col-end-4"
        >{{ title }}</h2
      >
    </div>
    <ol>
      <slot></slot>
    </ol>
  </div>
</template>

<style lang="scss">
.timeline::before {
  position: absolute;
  left: calc(theme('width.4') - 1px);
  display: block;
  width: 3px;
  height: 100%;
  content: '';
  background-color: theme('colors.primary.5');

  @screen md {
    left: calc(theme('width.28') + theme('width.10') + 3px);
  }
}

.timeline__header {
  grid-template-columns: theme('width.8') 1fr;

  @screen md {
    grid-template-columns: theme('width.28') theme('width.10') 1fr;
  }
}
</style>
