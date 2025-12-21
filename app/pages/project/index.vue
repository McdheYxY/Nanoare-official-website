<script setup>
const access_token = useCookie('access_token')
const router = useRouter()
const mode = ref(0)//0: 正常模式 1：编辑模式 2：删除模式
const deleteDisabled = ref(true)
const editSence = ref(false)

/* 获取作品合集 */
const { data: projects, refresh, error } = await useFetch('/api/projects');
if (error.value) {
    if (import.meta.server)
        throw createError({
            statusCode: 500,
            message: '服务器内部错误',
        });
}

const projectsNodes = computed(()=>{
    return projects.value?.nodes || []
})

useHead({
    title: '作品合集',
})
definePageMeta({
    pageTransition: {
        name: 'fade-in-up',
        mode: 'default',
    },
})

onMounted(() => {
    deleteDisabled.value = false
})

function deleteProject() {
    if (mode.value === 0) {
        mode.value = 2
    } else {
        mode.value = 0
    }
}

const title = ref('')
const link = ref('')
const cover = ref('')

function selectProject(event, project) {
    switch (mode.value) {
        case 2:
            event.preventDefault()
            const cf = confirm(`你确定要删除项目 ${projectInfo.getTitle(project.title)} 吗`)
            if (cf) {
                deleteDisabled.value = true
                $fetch('/api/projects/delete', {
                    method: "POST",
                    body: {
                        id: project.id
                    }
                }).then(() => {
                    alert(`删除成功`)
                    deleteDisabled.value = false
                    mode.value = 0
                    refresh()
                }).catch((error) => {
                    deleteDisabled.value = false
                    mode.value = 0
                    console.log(error);
                    alert('删除失败,该文章可能已删除')
                })
            }
            break;
        case 1:
            event.preventDefault()
            console.log(project);

            title.value = projectInfo.getTitle(project.title)
            link.value = projectInfo.getLink(project.body)
            cover.value = projectInfo.getCover(project.title)
            editSence.value = true
            break
    }
}
function editProject() {
    if (mode.value === 0) {
        mode.value = 1
    } else {
        mode.value = 0
    }
}
</script>
<template>
    <div class="wrap-outer">
        <nuxt-layout name="nano" :center="false" :footer="true"
            :New="{ display: !!access_token, disabled: !(mode === 0) }"
            :Edit="{ display: !!access_token, disabled: !(mode === 0 || mode === 1) }" @edit="editProject"
            :Delete="{ display: !!access_token, disabled: !(mode === 0 || mode === 2) || deleteDisabled }"
            @delete="deleteProject">
            <template #title>
                {{ $config.public.AUTHOR.toLocaleUpperCase() }}'S PROJECT
            </template>
            <template v-for="project in projectsNodes">
                <project-card v-if="projectInfo.isValid(project.title, project.body)"
                    @click="selectProject($event, project)" :mode="mode" :name="projectInfo.getTitle(project.title)"
                    :cover="projectInfo.getCover($config.public.GHCDN,project.title)" :link="projectInfo.getLink(project.body)" />
            </template>
            <Scene v-if="editSence" @clicklBackground="editSence = false">
                <h1>编辑项目</h1>
                <p>
                    <label for="title">
                        标题：
                        <input type="text" id="title" :value="title">
                    </label>
                </p>
                <p>
                    封面：<br />
                    <span><img :src="cover" alt=""></span>
                    <br />
                    <label for="file">
                        上传图片
                    </label>
                    <input type="file" id="file" style="display: none;">
                </p>
                <p>
                    <label for="link">
                        外链：
                        <input type="text" id="link" :value="link">
                    </label>
                </p>
                <p><button @click="editSence = false">取消</button><button>提交</button></p>
            </Scene>
        </nuxt-layout>
    </div>
</template>
<style scoped></style>
