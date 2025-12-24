<script setup>
const props = defineProps({
    TL_OWNER: String,
    TL_NAME: String,
    id: String
})
useHead({
    script: [
        /* giscus配置 */
        {
            src: 'https://giscus.app/client.js',
            'data-repo': `${props.TL_OWNER}/${props.TL_NAME}`,
            'data-repo-id': "R_kgDOQNIUNw",
            'data-mapping': "number",
            'data-term': props.id,
            'data-reactions-enabled': "1",
            'data-emit-metadata': "0",
            'data-input-position': "top",
            'data-theme': "preferred_color_scheme",
            'data-lang': "zh-CN",
            'data-loading': "lazy",
            crossorigin: "anonymous",
            async: true
        },
    ]
})
</script>
<template>
   <div class="giscus"></div>
</template>