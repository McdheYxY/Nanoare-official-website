<template>
    <div class="loading-container" ref="loading_container" :style="{ display: isLoading ? 'block' : 'none' }">
        <div class="loading">
            <p><span class="faceR" ref="loadingstr">Loading...</span></p>
            <p ref="loading"></p>
        </div>
        <div class="msg">
            <p>加载缓慢？</p>
            <p>试试刷新一下页面</p>
            <p>或者稍后再来看看</p>
        </div>
        <pre ref="ywz">(  ´･ω･)
(　´･ω)
(  　 ´･)
( 　　´)
(           )
(`　　 )
(･`       )
(ω･`　)
(･ω･`  )
(´･ω･`)
(  ´･ω･)</pre>
    </div>

</template>
<script setup>
const loadingIndicator = useLoadingIndicator()
const ywz = ref()
const loading = ref()
const loadingstr = ref()
const loading_container = ref()
const strlist = computed(() =>
    ywz.value.innerText.split("\n")
)
let index = 0;
const isLoading = computed(() => 
loadingIndicator.isLoading.value
)


function animation() {
    while (loading.value.children.length) {
        loading.value.firstElementChild.remove();
    }
    let str = strlist.value[index];
    for (let chr of str) {
        const span = document.createElement("span");
        span.innerText = chr;
        span.classList.add("faceR");
        loading.value.append(span);
    }
    index = index < strlist.value.length - 1 ? index + 1 : 0;
}

onMounted(() => {
    animation()
    loadingstr.value.addEventListener(
        "animationiteration",
        animation
    );
})

onUnmounted(() => {
    loadingstr.value.removeEventListener('animationiteration', animation)
})

</script>

<style>
:root {
    --delay: 1s;
}
.loading-container .msg{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.loading-container .msg p{
    text-align: center;
    opacity: 0;
    font-size: .7rem;
    color: #b3b3b3;
}
.loading-container .msg p:nth-child(1){
    animation: 1s easein  ease-in 5s forwards;
    
}
.loading-container .msg p:nth-child(2){
    animation:2s easein  ease-in 8s forwards;

}
    
.loading-container .msg p:nth-child(3){
    animation: 2s easein ease-in 12s forwards;
}
.loading-container {
    position: fixed;
    background-color: var(--background-color);
    color: var(--article-text-color);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;

}

.loading-container pre {
    display: none;
}

.loading-container .loading {
    position: absolute;
    left: 50vw;
    top: 50%;
    transform: translate(-50%,-50%);
}

.loading-container .loading p {
    text-align: center;
}

.loading-container span {
    display: inline-block;
    white-space: pre-wrap;
}

.loading-container .faceR {
    animation: faceR var(--delay) infinite;
    transform: translateY(0);
    transform-origin: center bottom;
    font-weight: 100;
    text-shadow: 0 0 6px #fff;
}
@keyframes easein {
    from {
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@keyframes faceR {
    0% {
        opacity: 0;
        transform: translateY(-0.4rem);
        font-weight: 100;
    }

    15% {
        opacity: 1;
        transform: scaleY(0.3);
    }

    30% {
        font-weight: 900;
        transform: translateY(-0.6rem) scaleY(1.3) rotateZ(4deg);
    }

    35% {
        transform: scaleY(1.3);
    }

    50% {
        transform: scaleY(0.9);
    }

    55% {
        transform: scaleY(1);
    }

    to {
        font-weight: 900;
    }
}
</style>