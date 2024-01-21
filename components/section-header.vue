<script>
export default {
  name: 'SectionHeader',
}
</script>

<template>
  <div class="text-center space-y-2 flex flex-col items-center">
    <div class="uppercase text-primary text-header-7 font-semibold"
      ><slot name="label"></slot
    ></div>
    <hr class="w-32 h-px border-neutral-4 my-3" />
    <h2 class="font-serif text-color-header text-header-3 font-semibold"
      ><slot></slot
    ></h2>
  </div>
</template>
