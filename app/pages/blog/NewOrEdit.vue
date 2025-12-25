<script setup>
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const editMode = ref(false)
/* markdown编辑器组件引用 */
const editor = ref()
definePageMeta({
    middleware: [
        'auth'//验证中间件
    ],
    path: '/blog/new/:id?',
    alias: ['/blog/edit/:id?'],
    props: true,//(router) => ({ id: router.params?.id })
})
const props = defineProps({
    id: String
})

if (props.id === undefined || props.id.trim()=='') {
    editMode.value = false
} else {
    if (!Number.isInteger(parseInt(props.id))) {
        throw createError({
            statusCode: 400,
            message: '你传入了错误的参数'
        })
    } else {
        editMode.value = true
    }
}

/* 获取GitHub用户token */
const access_token = useCookie('access_token')

/* GitHub讨论验证 */
gitdcus.auth({
    token: access_token.value,
    owner: config.public.TL_OWNER,
    name: config.public.TL_NAME,
})

/* blog标题元素 */
const title = ref()
const newDisabled = ref(true)

onMounted(async () => {
    /* 挂载后旋转标题 */
    title.value.select()
    newDisabled.value = false
})

/* 标题输入框enter键失去焦点 */
function handleEnterKey(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        window.getSelection().removeAllRanges()
        title.value.blur()
    }
}

// TODO 保存博客时考虑把cdn链接转为GitHub链接
/* 保存blog */
function saveBlog() {
    if (!editor.value.getMarkdown().trim()) {
        alert('内容不能为空')
        return
    }
    if (!title.value.value.trim()) {
        alert('标题不能为空')
        return
    }
    // XXX 未来会改用自定义确认对话框
    let cf = confirm(`标题：${title.value.value}\n摘要:${editor.value.getAbstract()}\n封面：${editor.value.getCover()}`)
    if (cf) {
        newDisabled.value = true
        if (editMode.value) {
            gitdcus.updateDiscussion({ body: editor.value.getMarkdown(), title: `[${title.value.value}](${editor.value.getAbstract()}"${editor.value.getCover()}")`, discussionIdOrNum: parseInt(props.id) }).then(() => {
                alert('修改成功')
                router.push('/blog')
            }).catch(error => {
                newDisabled.value = false
                alert("修改blog失败：" + error)
                console.log(error);
            })
        } else {
            editor.value.disabled()
            // XXX labelIds是标签id的数组，未来创建blog支持添加tag
            gitdcus.createDiscussion({
                title: `[${title.value.value}](${editor.value.getAbstract()}"${editor.value.getCover()}")`,
                body: editor.value.getMarkdown(),
                categoryName: 'blog',
                // labelIds,
            }).then(res => {
                alert('创建成功')
                router.push('/blog')
            }).catch(error => {
                newDisabled.value = false
                alert("创建blog失败：" + error)
                console.log(error);
            })
        }
    }

}
// TODO 没有用就删了吧 :)
function inputevent(md) {
    // console.log(md);
}


const { data, error } = await useFetch(() => `/api/blogs/${route.params.id}`);
if (error.value && import.meta.server) {
    throw createError({
        statusCode: 500,
        message: '服务器内部错误'
    })
}

if (data.value === undefined) {
    throw createError({
        statusCode: 404,
        message: '不存在该网络日志'
    })
}

async function editorLoad(vditor) {
    if (editMode.value) {
        console.log(data);
        title.value.value = blogInfo.getTitle(data.value.title)
        vditor.insertValue(data.value.body);
    }
}

</script>
<template>
    <div class="wrap-outer">
        <NuxtLayout name="nano" :footer="false" :Save="{ display: !!access_token, disabled: newDisabled }"
            @save="saveBlog()" :login="{ dispaly: !access_token }">
            <template #title>
                <input name="title" ref="title" @paste="titlePast" @keydown="handleEnterKey($event)"
                    style="width: 100%;outline-color:var(--text-link); border-width: 0;font-size: 2rem;font-weight: 700;"
                    value="标题" placeholder="请输入标题" />
            </template>
            <TuiEditor ref="editor" @inputevent="inputevent" @onload="editorLoad" />
        </NuxtLayout>
    </div>
</template>
<style scoped></style>