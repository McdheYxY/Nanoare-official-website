<script setup>
/* GitHub讨论验证 */
/* 一些page动画配置 */
definePageMeta({
    pageTransition: {
        name: 'fade-in-up',
        mode: 'default',
    },
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

/* 获取登录cookie信息 */
const access_token = useCookie('access_token')

/* 统计level 2-3 的标题锚点 */
const anchors = ref([])
/* 删除按钮显示状态 */
const deleteDisabled = ref(true)

/* 验证路由参数id是否合法 */
if (!Number.isInteger(parseInt(route.params.id)) || route.params.id === undefined) {
    throw createError({
        statusCode: 400,
        message: '你传入了错误的参数'
    })
}

gitdcus.auth({
    token: access_token.value,
    owner: config.public.TL_OWNER,
    name: config.public.TL_NAME,
})


/* 发送请求 */

const { data: blog, error } = await useFetch(() => `/api/blogs/${route.params.id}`, { cache: false });
if (error.value) {
    if (import.meta.server)
        throw createError({
            statusCode: 404,
            message: 'blog not found',
        });
}


// //没有返回结果？？
// if (blog.value === undefined) {
//     throw createError({
//         statusCode: 404,
//         message: '不存在该网络日志'
//     })
// }

const blogTitle = computed(() => {
    return blog.value?.title ? blogInfo.getTitle(blog.value.title) : "网络日志";
})

const blogAbstract = computed(() => {
    return blog.value?.title ? blogInfo.getAbstract(blog.value.title) : "Nanoare 的网络日志(blogs)";
})

const markdown = computed(() => {
    return blog.value?.body || "";
})

const blogCreatedAt = computed(()=>{
    return blog.value?.createdAt ? blogInfo.getDate(blog.value.createdAt) : "1970-01-01";
})
useHead({
    title: blogTitle.value,
    meta: [
        {
            name: 'description', content: blogAbstract.value
        },
        {
            property: 'og:type', content: 'website'
        },
        {
            property: 'og:title', content: 'ARENOT | 网络日志'
        },
        {
            property: 'og:description', content: blogAbstract.value
        },
        {
            name: 'twitter:card', content: 'summary'
        },
    ],
    link: [
        /* highlightjs github风格 */
        {
            rel: 'stylesheet',
            href: '/css/github.css'
        },
        /* markdownItTextualUml */
        {
            rel: 'stylesheet',
            href: 'https://testingcf.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css'
        }
    ],
    script: [
        /* gitducs配置 */
        {
            src: 'https://giscus.app/client.js',
            'data-repo': `${config.public.TL_OWNER}/${config.public.TL_NAME}`,
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
        },
        /* 复制功能 */
        {
            src: '/js/clipboard.js'
        }
    ]
})

let md = useMarkdownIt({
    anchor_callback(token, info) {
        anchors.value.push({
            hash: `#${info.slug}`,
            title: info.title,
            level: parseInt(token.tag.charAt(1)),
        });
    }
})

/* 响应式渲染为html */
let mdhtml = computed(() => {
    return md.render(markdown.value);
})


/* 跳转新建博客页面 */
function newBlog() {
    router.push('/blog/new')
}

// TODO 删除前提示转入草稿
/* 发送删除博客请求 */
async function deleteBlog() {
    let cf = confirm("你确定要删除此文章吗？推荐先保存为草稿")
    if (cf) {
        deleteDisabled.value = true
        let num = parseInt(route.params.id)
        if (Number.isInteger(num)) {
            $fetch('/api/blogs/delete', {
                method: "POST",
                body: {
                    id: num
                }
            }).then(() => {
                alert(`删除成功`)
                router.push('/blog')
            }).catch((error) => {
                deleteDisabled.value = false
                console.log(error);
                alert('删除失败,该文章可能已删除')
            })
        } else {
            deleteDisabled.value = false
            alert("错误")
            console.log('id格式有误');

        }
    }
}

/* 跳转博客编辑页*/
function editBlog() {
    router.push({
        path: '/blog/edit/' + route.params.id,
    })
}


onMounted(async () => {
    deleteDisabled.value = false
})

</script>
<template>
    <div class="wrap-outer">
        <nuxt-layout name="nano" :New="{ display: !!access_token }" :Edit="{ display: !!access_token }" @edit="editBlog"
            :Delete="{ display: !!access_token, disabled: deleteDisabled }" @new='newBlog()' @delete="deleteBlog">
            <article>
                <div class="header">
                    <h1 class="article-title">{{ blogTitle }}</h1>
                </div>
                <div class="article-meta">
                    <p>作者：<nuxt-link to="/about">{{ $config.public.AUTHOR }}</nuxt-link></p>
                    <p>时间：{{ blogCreatedAt }}</p>
                </div>
                <div class="article-content" v-html="mdhtml">
                </div>
            </article>
            <div class="comments">
                <div class="giscus"></div>
            </div>
            <AnchorNav v-if="anchors.length" :anchors="anchors" />
        </nuxt-layout>
    </div>
</template>
<style></style>