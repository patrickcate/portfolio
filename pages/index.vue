<script>
export default {
  name: 'HomePage',
  async asyncData({ $content }) {
    const skills = await $content('skills').sortBy('order').fetch()
    const { tools } = await $content('tools').fetch()

    return {
      skills,
      tools,
    }
  },
}
</script>

<template>
  <div class="container space-y-8">
    <div class="grid sm:grid-cols-2">
      <div class="mb-8 sm:mb-0">
        <h1
          class="heading-highlight font-serif font-semibold text-color-header text-header-2 text-wrap-balance"
          >I&rsquo;m a Graphic Designer & Front-End Developer</h1
        >
        <h2
          class="font-sans font-semibold text-primary text-header-3 text-wrap-balance"
          >I enjoy designing applications <wbr />and websites, and then building
          them.</h2
        >
      </div>
      <div>
        <img
          src="~/assets/images/hero-illustration.svg"
          alt=""
          role="presentation"
        />
      </div>
    </div>

    <section-header>
      <template #label>Skills</template>
      What I'm Good At
    </section-header>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
    >
      <v-card v-for="skill in skills" :key="skill.slug">
        <template #media>
          <svg-icon
            :name="skill.icon"
            class="w-24 h-24 text-primary"
            role="presentation"
          />
        </template>
        <template #title>{{ skill.title }}</template>
        <nuxt-content :document="skill" />
      </v-card>
    </div>

    <section-header>
      <template #label>Tools</template>
      What I Work With
    </section-header>
    <ul
      class="icon-grid flex flex-wrap justify-center gap-6 text-center font-medium"
    >
      <template v-for="tool in tools">
        <li :key="tool.name">
          <img
            :src="require(`~/assets/images/tools/${tool.logo}.svg`)"
            loading="lazy"
            :alt="tool.name"
            width="100"
            height="100"
            class="mx-auto"
          />
          {{ tool.name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
.heading-highlight {
  position: relative;

  &::before {
    position: absolute;
    top: -0.75rem;
    left: -1.5rem;
    width: 3rem;
    height: 3rem;
    content: '';
    background-color: rgba(241, 181, 30, 1);
    border-radius: 50%;
    opacity: 0.25;
  }
}
</style>
