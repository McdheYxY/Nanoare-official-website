<template>
  <div class="wrap-outer">
    <nuxt-layout name="nano">
      <template #title>
        About Me
      </template>
      <article>
        <div class="article-content" v-html="mdhtml">

        </div>
      </article>
    </nuxt-layout>
  </div>
</template>
<script setup>
useHead({
  title: 'About Me',
  meta: [
    {
      name: 'description', content: '此网站采用以下技术实现：NuxtJS、Vue.js、markdown- it、highlight.js、Tailwind CSS'
    },
    {
      property: 'og:type', content: 'website'
    },
    {
      property: 'og:title', content: 'ARENOT | About Me'
    },
    {
      property: 'og:description', content: '此网站采用以下技术实现：NuxtJS、Vue.js、markdown- it、highlight.js、Tailwind CSS'
    },
    {
      name: 'twitter:card', content: 'summary'
    },
  ],
})
definePageMeta({
  pageTransition: {
    name: 'fade-in-up',
    mode: 'default',
  },
})

// const data = ref("")
// try {
  
  
//   data.value = body.value;
// } catch (error) {
//   throw createError({
//     statusCode: 500,
//     statusMessage: '服务器内部错误'
//   })
// }
import aboudMd from '~~/public/md/about.md?raw'

const md = useMarkdownIt();

const mdhtml = computed(()=>{
  return md.render(aboudMd);
})


// TODO 最后完成
</script>

<style>



</style>