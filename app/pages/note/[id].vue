<script setup>
import markdownit from 'markdown-it'
const route = useRoute()
const appConfig = useAppConfig()
const router = useRouter()
const access_token = useCookie('access_token')

if (!Number.isInteger(parseInt(route.params.id)) || route.params.id === undefined) {
    if (import.meta.server)
        throw createError({
            statusCode: 400,
            message: '你传入了错误的参数'
        });
}


const { data: note, error } = await useFetch(() => `/api/notes/${route.params.id}`);
if (error.value) {
    if (import.meta.server)
        throw createError({
            statusCode: 404,
            message: 'note not found'
        });
}

// if (note.value === undefined) {
//     throw createError({
//         statusCode: 404,
//         message: '不存在该编程日记'
//     })
// }
const noteTitle = computed(()=>{
    return note.value?.title || "Nanoare 的编程日记(notes)"
})
useHead({
    title: '编程日记',
    meta: [
        {
            name: 'description', content: noteTitle.value
        },
        {
            property: 'og:type', content: 'website'
        },
        {
            property: 'og:title', content: 'ARENOT | 编程日记'
        },
        {
            property: 'og:description', content: noteTitle.value
        },
        {
            name: 'twitter:card', content: 'summary'
        },
    ],
    script: [
        {
            src: 'https://giscus.app/client.js',
            'data-repo': "McdheYxY/Nanoare-official-website",
            'data-repo-id': "R_kgDOQNIUNw",
            'data-mapping': "number",
            'data-term': route.params.id,
            'data-reactions-enabled': "1",
            'data-emit-metadata': "0",
            'data-input-position': "top",
            'data-theme': "preferred_color_scheme",
            'data-lang': "zh-CN",
            'data-loading': "lazy",
            crossorigin: "anonymous",
            async: true
        }
    ]
})

definePageMeta({
    pageTransition: {
        name: 'fade-in-up',
        mode: 'out-in',
    },
})

// // if(data.value === undefined) 
// onMounted(async () => {
//     console.log(data.value, 1);
// })

const markdown = computed(()=>{
    return note.value?.body || "";
})

let mdhtml = computed(() => {
    const md = new markdownit();
    return md.render(markdown.value);
})

function newNote() {
    router.push('/note/new')
}
</script>
<template>
    <div class="wrap-outer">
        <nuxt-layout name="nano" :New="{ display: !!access_token }" :Edit="{ display: !!access_token }"
            :Delete="{ disabled: true }" @new='newNote()'>
            <article>
                <div class="header">
                    <h1 class="article-title">{{ noteTitle }}</h1>
                </div>
                <div class="article-meta">
                    <p>作者：<a href="about">{{ $config.public.AUTHOR }}</a></p>
                    <p>时间：2024-07-27</p>
                    <p>
                        本文是该系列的第二部分，请务必先阅读：<a href="about">Part 1</a>
                    </p>
                </div>
                <div class="article-content" v-html="mdhtml">

                </div>
                <div class="article-meta">
                    <p>欢迎阅读本系列下一篇：<a href="about">Part 3</a></p>
                </div>
            </article>
            <div class="comments">
                <div class="giscus"></div>
            </div>
        </nuxt-layout>
    </div>
</template>
<style scoped>
/* .main {
    width: calc(100% - 20px);
    min-width: 300px;
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
} */
</style>