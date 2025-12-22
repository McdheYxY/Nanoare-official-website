<template>
    <div class="project-card">
        <a :href="props.link" target="_blank">
            <span>
                <p ref="loading" class="loading">{{ props.name }}</p>
                <div ref="loadImg" :class="{ deleteMode: props.mode === 2, editMode: props.mode === 1 }"
                    v-imgloader="{ imgsrc: props.cover , failed: imgLoadFailed, succeed: imgLoadSucceed }">
                    <img :src="imgsrc" alt="cover"/>
                </div>
            </span>
        </a>
    </div>
</template>
<script setup>
const props = defineProps({
    name: {
        type: [String, Number],
        default: 'Unknown'
    },
    cover: {
        type: String,
    },
    link: {
        type: String,
        default: '/'
    },
    mode: {
        type: Number,
        default: 0
    }
})
let imgsrc = ref("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0AQMAAADfKmdSAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAB5JREFUWMPtwTEBAAAAwiD7p7bGDmAAAAAAAAAAYQcc1AABGAY3dgAAAABJRU5ErkJggg==")
const loading = ref()

function imgLoadFailed() {
    loading.value.classList.remove('loading');
}

function imgLoadSucceed() {
    loading.value.style.display = 'none'
}


// document.documentElement.

</script>
<style>
.project-card {
    display: inline;
}

.project-card span {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    vertical-align: top;
    background: #eee;
    border: calc(4px + 0.4vmin) solid var(--background-color);
    font-size: 1rem;
}

.project-card span div.deleteMode {
    border: 5px dotted red;
}

.project-card span div.editMode {
    border: 5px dotted greenyellow;
}

.project-card a {
    font-size: 0;
}

.project-card a:hover>span {
    border-color: #fd0;
}

.project-card span p {
    position: absolute;
    top: 50%;
    color: #aaa;
    transform: translateY(-50%);
    font-size: calc(0.5rem + 1.2vmin);
    padding: 20px;
    margin: 0;
    line-height: 1.7;
}

.project-card span p.loading {
    animation: animLoading 0.15s ease-out infinite;
}

.project-card span img {
    vertical-align: bottom;
    width: 100%;
    object-fit: cover;
}

@media (min-width: 360px) {
    .project-card span {
        width: calc(100% / 2);
    }
}

@media (min-width: 800px) {
    .project-card span {
        width: calc(100% / 3);
    }
}

@media (min-width: 600px) and (max-height: 600px) {
    .project-card span {
        width: calc(100% / 3);
    }
}

@media (min-width: 1400px) {
    .project-card span {
        width: calc(100% / 4);
    }
}

@media (min-width: 1800px) {
    .project-card span {
        width: calc(100% / 5);
    }
}

@media (min-width: 2300px) {
    .project-card span {
        width: calc(100% / 6);
    }
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