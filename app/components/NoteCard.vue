<template>
    <div class="note-card">
        <div class="note-card-title">{{ props.title }}</div>
        <ul class="posts">
            <li v-for="post in noteInfo.getData(posts)">
                ({{ post.date }})
                <nuxt-link :to="'/note/'+ post.id">{{ post.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
import noteInfo from '~/utils/noteInfo.js'
const props = defineProps({
    title: {
        type: String,
        default: '项目名称'
    },
    posts: {
        type: String,
        default: ''
    }
})
</script>
<style scoped>
.note-card {
    /* font-size: 0.9rem; */
    margin-bottom: 2.5rem;
}

.note-card ul {
    padding-inline-start: 1.5rem;
    list-style: none;
}

.note-card li::before {
    content: "";
    background-color: var(--article-text-color);
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    left: -1rem;
    top: 0.7rem;
    transform: rotate(45deg);
}

.note-card li {
    position: relative;
    line-height: 1.7rem;
    letter-spacing: 0.009rem;
}

.note-card a {
    color: var(--text-link);
}

.note-card-title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
}
</style>