<script setup>
const router = useRouter()
const { data: notes, error } = await useFetch('/api/notes');
if (error.value) {
    console.log(error.value);
    if (import.meta.server)
        throw createError({
            statusCode: 500,
            message: '服务器内部错误'
        });
}
const notesNodes = computed(()=>{
    return notes.value?.nodes || [];
})
const access_token = useCookie('access_token')
useHead({
    title: '编程日记',
    meta: [
        {
            name: 'description', content: 'Nanoare 的编程日记(notes)。这里有许多有趣的科技话题，静候你来挖掘。此博客已开源。分享前端、Python、Java、Android和C/C++知识。记录作品从想法到诞生的整个周期。发布已开源作品演示。致力于打造一个充满趣味和匠心的灵感聚集地，激励更多开发者加入进来。'
        },
        {
            property: 'og:type', content: 'website'
        },
        {
            property: 'og:title', content: 'ARENOT | 编程日记'
        },
        {
            property: 'og:description', content: 'Nanoare 的编程日记(notes)。这里有许多有趣的科技话题，静候你来挖掘。此博客已开源。分享前端、Python、Java、Android和C/C++知识。记录作品从想法到诞生的整个周期。发布已开源作品演示。致力于打造一个充满趣味和匠心的灵感聚集地，激励更多开发者加入进来。'
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

function newNote() {
    router.push('/note/new')
}

</script>
<template>
    <div class="wrap-outer">
        <nuxt-layout name="nano" :New="{ display: !!access_token }" :Edit="{ display: !!access_token }"
            @new="newNote()">
            <template #title>
                {{ $config.public.AUTHOR.toLocaleUpperCase() }}'S NOTE
            </template>

            <note-card v-for="note in notesNodes" :title="note.title" :posts="note.body" />

        </nuxt-layout>
    </div>
</template>
<style scoped></style>