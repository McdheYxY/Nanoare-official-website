<script setup>
useHead({
    title: 'Error Page',
})
const props = defineProps({
    error: Object
})
// TODO 直接返回错误消息给用户是不友好的，但是为了有迹可循log输出一份完整报错还是有必要的
</script>

<template>
    <nuxt-layout name="nano">
        <div class="error-container">
            <div class="error-code">{{ props.error.statusCode }}</div>
            <h1 class="error-msg">{{ props.error.message || '未知错误' }}</h1>
            <NuxtLink class="btn" to="/">Back to home</NuxtLink>
        </div>
    </nuxt-layout>
</template>
<style scoped>
.error-container {
    min-height: calc(100vh - 3.75rem);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.error-container .error-code {
    font-size: 1rem;
    color: var(--text-link);
    font-weight: 600;
}

.error-container .error-msg {
    margin-top: .7rem;
    margin-bottom: 0;
}

.error-container .btn {
    font-size: .875rem;
    padding: .5rem .7rem;
    border-radius: .375rem;
    background-color: var(--text-link);
    color: var(--background-color);
    margin-top: 2rem;
}

.error-container .btn:hover {
    opacity: .9;
}
</style>