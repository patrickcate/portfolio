<script>
export default {
  name: 'ResumePage',
  async asyncData({ $content }) {
    const experience = await $content('resume/experience')
      .sortBy('startDate', 'desc')
      .fetch()
    const education = await $content('resume/education')
      .sortBy('date', 'desc')
      .fetch()
    const certifications = await $content('resume/certifications')
      .sortBy('order')
      .fetch()
    return {
      experience,
      education,
      certifications,
    }
  },
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-full md:col-start-1 md:col-end-10 xl:col-end-11">
      <page-title>Resume</page-title>
      <main id="main-content" role="main" class="space-y-16">
        <timeline-list icon="work-experience" title="Work Experience">
          <timeline-list-entry
            v-for="job in experience"
            :key="job.slug"
            class="mb-12"
          >
            <template #date
              >{{ job.startDate }}&ndash;{{ job.endDate }}</template
            >
            <template #title
              ><span class="uppercase">{{ job.companyName }}</span
              ><span v-if="job.formerCompanyName">
                (formally {{ job.formerCompanyName }})</span
              ><span v-if="job.location"
                >, <i>{{ job.location }}</i></span
              >
            </template>
            <template #subtitle>{{ job.title }}</template>
            <nuxt-content
              :document="job"
              class="prose text-wrap-pretty"
            ></nuxt-content>
          </timeline-list-entry>
        </timeline-list>

        <timeline-list icon="education" title="Education">
          <timeline-list-entry class="mb-12">
            <template #date>{{ education[0].date }}</template>
            <template #title>
              <span class="uppercase">{{ education[0].college }}</span
              ><span v-if="education[0].location"
                >, <i>{{ education[0].location }}</i></span
              >
            </template>
            {{ education[0].title }}, {{ education[0].gpa }} GPA
          </timeline-list-entry>
          <timeline-list-entry class="mb-6">
            <template #date>{{ education[1].date }}</template>
            <template #title>
              <span class="uppercase">{{ education[1].college }}</span
              ><span v-if="education[1].location"
                >, <i>{{ education[1].location }}</i></span
              >
            </template>
            {{ education[1].title }}, {{ education[1].gpa }} GPA
          </timeline-list-entry>
          <timeline-list-entry class="mb-12">
            <template #date>{{ education[2].date }}</template>
            {{ education[2].title }}, {{ education[2].gpa }} GPA
          </timeline-list-entry>
        </timeline-list>

        <timeline-list icon="award" title="Certifications">
          <timeline-list-entry
            v-for="cert in certifications"
            :key="cert.slug"
            class="mb-6"
          >
            <template #date>{{ cert.date }}</template>
            <template #title>{{ cert.title }}</template>
          </timeline-list-entry>
        </timeline-list>
      </main>
    </div>
    <aside
      class="col-span-full md:col-start-10 xl:col-start-11 md:col-end-13 mt-6 md:mt-14"
    >
      <social-media-links class="space-y-4"></social-media-links>
    </aside>
  </div>
</template>
