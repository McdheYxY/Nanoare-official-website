<script setup>
import { stringifyQuery } from 'vue-router';
const router = useRouter()
const route = useRoute()
const url = useRequestURL()

definePageMeta({
    pageTransition: {
        name: 'fade-in-up',
        mode: 'default',
    },
})

/* 获取浏览器用户token */
const access_token = useCookie('access_token')

// TODO 登录状态显示，避免用户重复登录（浪费申请次数）
// const loading = useLoadingIndicator()

useHead({
    title: '网络日志',
    meta: [
        {
            name: 'description', content: 'Nanoare 的网络日志(blogs)'
        },
        {
            property: 'og:type', content: 'website'
        },
        {
            property: 'og:title', content: 'ARENOT | 网络日志'
        },
        {
            property: 'og:description', content: 'Nanoare 的网络日志(blogs)'
        },
        {
            name: 'twitter:card', content: 'summary'
        },
    ],
    link: [
        {
            /*
             因为有动画，在id与index页面切换时有一个时刻他们会同时存在在dom上，
             然而id页的katex css已经卸载，导致公式的svg超过水平宽度，使得页面横向溢出，
             切换时会发送抖动，这里作了修复
             */
            rel: 'stylesheet',
            href: 'https://testingcf.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css'
        }
    ]
})

let fetchDate = {
}

if (route.query.end) {//下一页
    fetchDate.end = route.query.end
} else if (route.query.start) {//上一页
    fetchDate.start = route.query.start
}

/* 获取blog */
const { data: blogs, error } = await useFetch('/api/blogs', {
    cache: false, query: {
        ...fetchDate
    }
});

if (error.value) {
    console.log(error.value);
    if (import.meta.server)
        throw createError({
            statusCode: 500,
            message: '服务器内部错误',
        });
}

const blogsNodes = computed(() => {
    return blogs.value?.nodes || [];
})

const pageInfo = computed(() => {
    return blogs.value?.pageInfo || { hasNextPage: false, hasPreviousPage: false };
})
const loginDisabled = ref(true)
onMounted(async () => {

    // TODO 这段代码复用性太差，因为其他页面也支持登录功能，需要改进。中间件解决？
    /* 获取code换取GitHub的用户token */
    if (route.query?.code) {
        loginDisabled.value = true;
        try {
            const data = await $fetch('/api/auth', {
                query: { code: route.query.code },
                cache: 'no-store'
            })
            if (!data) throw new Error('没有返回结果')
            if (data?.access_token) {
                const t = new Date()
                t.setSeconds(t.getSeconds() + data.expires_in)
                document.cookie = `access_token=${data.access_token};Expires=${t.toUTCString()}`
            }
            const query = queryParse(url.search)
            delete query.code
            router.replace(`${url.pathname}?${stringifyQuery(query)}${url.hash}`)
        } catch (e) {
            const query = queryParse(url.search)
            delete query.code
            router.replace(`${url.pathname}?${stringifyQuery(query)}${url.hash}`)
            loginDisabled.value = false;
            alert('登录失败')
            console.log(e);
        }
    } else {
        loginDisabled.value = false;
    }
})

/* 创建blog */
function newBlog() {
    router.push('/blog/new')
}

</script>
<template>
    <div class="wrap-outer">
        <NuxtLayout name="nano" :New="{ display: !!access_token }" :logout="!!access_token"
            :login="{ display: !access_token, disabled: loginDisabled }" @new="newBlog()" @login="loginDisabled = true">
            <template #title>
                {{ $config.public.AUTHOR.toLocaleUpperCase() }}'S BLOG
            </template>

            <blog-card v-for="blog in blogsNodes" :id="blog.number" :title="blogInfo.getTitle(blog.title)"
                :abstract="blogInfo.getAbstract(blog.title)"
                :cover="blogInfo.getCover($config.public.GHCDN, blog.title)" :date="blogInfo.getDate(blog.createdAt)"
                :time="blogInfo.getTime(blog.createdAt)" :tags="blog.labels.nodes" />

            <div class="previous-next-links">
                <p>
                    <a class="previous-design-link" :class="{ disabled: !pageInfo.hasPreviousPage }"
                        :href="pageInfo.startCursor ? `/blog?start=${pageInfo.startCursor}` : '#'">
                        上一页
                    </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="next-design-link"
                        :class="{ disabled: !pageInfo.hasNextPage }"
                        :href="pageInfo.endCursor ? `/blog?end=${pageInfo.endCursor}` : '#'">
                        下一页
                    </a>
                </p>
            </div>
        </NuxtLayout>
    </div>
</template>
<style>
.previous-next-links {
    line-height: 24px;
    overflow: hidden;
    padding: 10px 30px 10px 30px;
    font-size: 15px;
}

.previous-next-links p {
    text-align: center;
}

/* .previous-design-link{
    float: left;
}
.next-design-link{
    float: right;
} */
</style>