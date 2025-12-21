<template>
    <nuxt-link :to="'/blog/' + props.id">
        <div class="blog-card">
            <div class="blog-card-date">{{ props.date }}</div>
            <div class="blog-card-time">{{ props.time }}</div>
            <div class="blog-card-content-container">
                <div class="blog-card-content">
                    <div class="blog-card-title">{{ props.title }}</div>
                    <div class="blog-card-abstract">
                        {{ props.abstract }}
                    </div>
                </div>
                <div class="cover" v-if="props.cover" @click="imgErrorReTry($event)"
                    v-imgloader="{ imgsrc: props.cover, failed: imgLoadFailed, succeed: imgLoadSucceed }"
                    ref="coverBox">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0AQMAAADfKmdSAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAB5JREFUWMPtwTEBAAAAwiD7p7bGDmAAAAAAAAAAYQcc1AABGAY3dgAAAABJRU5ErkJggg==" alt="cover"/>
                    <span ref="loading" class="loading">loading...</span>
                </div>
            </div>
            <div class="blog-card-tags">
                <span v-for="tag in props.tags"
                    :style="`background-color:#${tag.color};--label-r:${color.hex.rgb(tag.color)[0]};--label-g:${color.hex.rgb(tag.color)[1]};--label-b:${color.hex.rgb(tag.color)[2]};--perceived-lightness:calc(((var(--label-r) * 0.2126) + (var(--label-g) * 0.7152) + (var(--label-b) * 0.0722)) / 255);--lightness-switch:max(0, min(calc((var(--perceived-lightness) - 0.453) * -1000), 1));color:hsl(0deg, 0%, calc(var(--lightness-switch) * 100%));`">{{
                        tag.name }}</span>
            </div>
        </div>
    </nuxt-link>
</template>
<script setup>
import color from 'color-convert';

const props = defineProps({
    date: {
        type: String,
        default: '0000-00-00'
    },
    time: {
        type: String,
        default: '00:00'
    },
    title: {
        type: String,
        default: '标题'
    },
    abstract: {
        type: String,
        default: '作者很懒，什么也没写'
    },
    cover: {
        type: String
    },
    tags: {
        type: Array,
        default: []
    },
    id: {
        type: [String, Number],
        required: true
    }
})
const loading = ref()
const coverBox = ref()
function imgLoadSucceed() {
    
    if (loading.value) {//元素被卸载了,但是还是有回调??
        loading.value.style.display = 'none'
    }
}
function imgLoadFailed() {
    if (loading.value) {
        loading.value.classList.remove('loading');
        loading.value.innerText = 'error'
    }
}
function imgErrorReTry(event) {
    if (!loading.value.classList.contains('loading')) {
        event.stopPropagation()
        event.preventDefault();
        loading.value.classList.add('loading');
        coverBox.value.removeAttribute('error')
        loading.value.innerText = 'loading';
        window.scrollTo({ top: window.scrollY + 1 })
        window.scrollTo({ top: window.scrollY - 1 })
    }

}
</script>
<style>
.blog-card {
    box-sizing: border-box;
    /* background-color: var(--card-background-color); */
    margin-bottom: 1rem;
    position: relative;
    padding: 3.5rem .3rem 1rem;
    letter-spacing: 0.05rem;
}

.blog-card-date {
    position: absolute;
    top: 1.5rem;
    inset-inline-start: .3rem;
}

.blog-card-time {
    position: absolute;
    top: 1.5rem;
    inset-inline-end: .3rem;
}

.blog-card-title {
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    line-height: 1.4rem;
    margin-bottom: 0.6rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* display: flex; */
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
}

.blog-card-content-container {
    display: flex;
    margin-bottom: 1.2rem;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
}

.blog-card-abstract {
    display: block;
    line-height: 1.4rem;
    font-size: .875rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* display: flex; */
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
    -webkit-box-orient: vertical;
}

.blog-card-content-container .cover {
    display: block;
    width: 7rem;
    height: 5rem;
    flex-shrink: 0;
    align-self: flex-end;
    border-radius: 0.2rem;
    margin-left: .3rem;
    overflow: hidden;
    position: relative;
}

.blog-card-content-container .cover span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.blog-card-content-container .cover span.loading {
    animation: animLoading 0.15s ease-out infinite;
}

.blog-card-content-container img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.blog-card-tags {
    display: flex;
    justify-content: flex-end;
}

.blog-card-tags span {
    border-radius: 0.3rem;
    margin-inline-start: 0.7rem;
    padding: 0.2rem 0.6rem;
    text-align: center;
    color: black;
    background-color: #fff2cc;
    font-size: 0.8rem;
}

@keyframes animLoading {
    0% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}
</style>