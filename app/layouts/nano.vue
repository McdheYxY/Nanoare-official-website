<template>
    <div :class="{ main: center, main2: !center }">
        <div class="header">
            <p class="links">
                <nuxt-link to="/">arenot.cn</nuxt-link>&nbsp;&nbsp;<nuxt-link to="/about">About
                    Me</nuxt-link>
                <span class="caozuo">
                    <a @click="$emit('login')" :class="{ disabled: props.login?.disabled }"
                        :href="`https://github.com/login/oauth/authorize?redirect_uri=${encodeURIComponent(url.origin + url.pathname)}&client_id=Iv23liOZ63fLxRHKZIFy`"
                        v-if="props.login?.display">admin</a>
                    <a href="javascript:void(0)" v-if="props.logout" @click="logout">Logout</a>
                    <a href="javascript:void(0)" :class="{ disabled: props.New?.disabled }" v-if="props.New?.display"
                        @click="$emit('new')">New</a>
                    <a href="javascript:void(0)" :class="{ disabled: props.Edit?.disabled }" v-if="props.Edit?.display"
                        @click="$emit('edit')">Edit</a>
                    <a href="javascript:void(0)" :class="{ disabled: props.Save?.disabled }" v-if="props.Save?.display"
                        @click="$emit('save')">Save</a>
                    <a href="javascript:void(0)" :class="{ disabled: props.Delete?.disabled }"
                        v-if="props.Delete?.display" @click="$emit('delete')">Delete</a>
                </span>
            </p>
            <h1 v-if="$slots.title">
                <slot name="title"></slot>
            </h1>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div v-if="footer" class="footer">
            <p class="links">
                <a href="https://github.com/McdheYxY/" target="_blank">Github</a>
                |
                <a href="https://space.bilibili.com/1034153162" target="_blank">BiliBili</a>
                |
                <a href="https://afdian.com/a/nanoare" target="_blank">Support Me</a>
            </p>
        </div>
    </div>

</template>
<script setup>
const router = useRouter()
const route = useRoute()
const url = useRequestURL()
const props = defineProps({
    center: {//main是否居中
        type: Boolean,
        default: true
    },
    footer: {//是否启用footer
        type: Boolean,
        default: true
    },
    New: {
        type: Object,
        default: {}
    },
    Save: {
        type: Object,
        default: {}
    },
    Edit: {
        type: Object,
        default: {}
    },
    Delete: {
        type: Object,
        default: {}
    },
    login: {
        type: Object,
        default: {}
    },
    logout: {
        type: Boolean,
        default: false
    }
})
function logout() {
    const t = new Date(0)
    document.cookie = `access_token=${1};Expires=${t.toUTCString()}`
}
const appConfig = useAppConfig()

defineEmits(['new', 'save', 'delete', 'edit', 'login'])
</script>
<style scoped>
.header .links .caozuo {
    float: right;
}

.header .links .caozuo a {
    margin-inline-start: 1rem;
}

</style>