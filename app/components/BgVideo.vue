<template>
    <!-- 静音 &muted=0 -->
    <iframe id="iframe"
        :src="`//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=${props.bvid}&page=1&as_wide=0&autoplay=1&qn=64&fourk=1&platform=html5&noFullScreenButton=1&hideDanmakuButton=1&hideCoverInfo=1&hasMuteButton=0&t=0&high_quality=1&danmaku=0&muted=0`"
        allowfullscreen="allowfullscreen"></iframe>
</template>
<script setup>
const props = defineProps({
    bvid: {
        type: String,
        default: 'BV17123B5E27'
    },
})
function _resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var pw = w * 1.2,
        ph = h * 1.2;

    if (16 / 9 < w / h) {
        ph = (pw * 9) / 16;
    } else {
        pw = (ph * 16) / 9;
    }
    var elem = document.getElementById("iframe");
    elem.style.width = pw + "px";
    elem.style.height = ph + "px";
}
function play(){
    setTimeout(() => {
        document.getElementById("iframe").style.opacity = "0.5"
    }, 3000);
}
onMounted(() => {
    _resize()
    window.addEventListener("resize", _resize);
    window.addEventListener("load",play)
    
})
onUnmounted(() => {
    window.removeEventListener("resize", _resize);
    window.removeEventListener("load",play)
})
</script>
<style>
#iframe {
    z-index: -1;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: opacity 5s ease-in-out;
    opacity: 0;
}
</style>