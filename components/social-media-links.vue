<script>
export default {
  name: 'SocialMediaLinks',
}
</script>

<template>
  <ul>
    <li>
      <a
        href="https://www.linkedin.com/in/pcate/"
        rel="noopener noreferrer external"
        class="flex font-semibold hover:underline underline-offset underline-thickness hover:underline-thickness text-primary hover:text-primary-7 active:text-primary-9 transition-colors"
        ><svg-icon
          name="linkedin"
          class="w-5 h-5 sm:w-6 sm:h-6 mr-1 inline-block"
          role="presentation"
        />LinkedIn<span class="hidden xs:inline">.com</span></a
      >
    </li>
    <li>
      <a
        href="https://github.com/patrickcate"
        rel="noopener noreferrer external"
        class="flex font-semibold hover:underline underline-offset underline-thickness hover:underline-thickness text-primary hover:text-primary-7 active:text-primary-9 transition-colors"
        ><svg-icon
          name="github"
          class="w-5 h-5 sm:w-6 sm:h-6 mr-1 inline-block"
          role="presentation"
        />GitHub<span class="hidden xs:inline">.com</span></a
      >
    </li>
    <li>
      <a
        href="https://www.drupal.org/u/pcate"
        rel="noopener noreferrer external"
        class="flex font-semibold hover:underline underline-offset underline-thickness hover:underline-thickness text-primary hover:text-primary-7 active:text-primary-8 transition-colors"
        ><svg-icon
          name="drupal"
          class="w-5 h-5 sm:w-6 sm:h-6 mr-1 inline-block"
          role="presentation"
        />Drupal<span class="hidden xs:inline">.org</span></a
      >
    </li>
  </ul>
</template>

<style lang="scss"></style>
