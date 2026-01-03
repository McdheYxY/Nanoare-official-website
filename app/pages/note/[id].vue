<script setup>
const route = useRoute()
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
const noteTitle = computed(() => {
    return note.value?.title || "Nanoare 的编程日记(notes)。这里有许多有趣的科技话题，静候你来挖掘。此博客已开源。分享前端、Python、Java、Android和C/C++知识。记录作品从想法到诞生的整个周期。发布已开源作品演示。致力于打造一个充满趣味和匠心的灵感聚集地，激励更多开发者加入进来。"
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

const markdown = computed(() => {
    return note.value?.body || "";
})

let md = useMarkdownIt({
    // anchor_callback(token, info) {
    //     anchors.value.push({
    //         hash: `#${info.slug}`,
    //         title: info.title,
    //         level: parseInt(token.tag.charAt(1)),
    //     });
    // }
})

/* 响应式渲染为html */
let mdhtml = computed(() => {
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
                <Comment :id="$route.params.id" :TL_OWNER="$config.public.TL_OWNER" :TL_NAME="$config.public.TL_NAME" />
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