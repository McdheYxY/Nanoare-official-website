<script setup>
// TODO 这个文档访问次数较多，页面所需的数据对每个用户来说都是相同的。更多：https://cn.vuejs.org/guide/scaling-up/ssr.html#ssr-vs-ssg
const config = useRuntimeConfig()
useHead({
    title: 'Nanoare official website',
    meta: [
        {
            name: 'description', content: 'Nanoare 的网络日志(blogs)、编程日记(notes)、作品合集(projects)发布页。这里有许多有趣的科技话题，静候你来挖掘。此博客已开源。分享前端、Python、Java、Android和C/C++知识。记录作品从想法到诞生的整个周期。发布已开源作品演示。致力于打造一个充满趣味和匠心的灵感聚集地，激励更多开发者加入进来。'
        },
        {
            property: 'og:url', content: 'https://arenot.cn/'
        },
        {
            property: 'og:type', content: 'website'
        },
        {
            property: 'og:title', content: 'ARENOT | Nanoare official website'
        },
        {
            property: 'og:description', content: 'Nanoare 的网络日志(blogs)、编程日记(notes)、作品合集(projects)发布页。这里有许多有趣的科技话题，静候你来挖掘。此博客已开源。分享前端、Python、Java、Android和C/C++知识。记录作品从想法到诞生的整个周期。发布已开源作品演示。致力于打造一个充满趣味和匠心的灵感聚集地，激励更多开发者加入进来。'
        },
        {
            property: 'og:image', content: 'https://arenot.cn/img/logo.png'
        },
        {
            name: 'twitter:card', content: 'summary'
        },
        {
            name: 'twitter:image', content: 'https://arenot.cn/img/logo.png'
        }
    ]
})

definePageMeta({
    pageTransition: {
        name: 'fade-in',
        mode: 'out-in',//https://cn.vuejs.org/guide/built-ins/transition.html#transition-modes 避免二者同时存在时出现的布局问题
    },
})

const bgVideo = ref()

onMounted(async () => {
})


</script>
<template>
    <div id="container">
        <div id="header">
            <h1>ARENOT</h1>
            <p>{{ $config.public.AUTHOR }} official website</p>
        </div>
        <div id="content">
            <nuxt-link to="blog">网络日志</nuxt-link>
            <nuxt-link to="note">编程日记</nuxt-link>
            <nuxt-link to="project">作品合集</nuxt-link>
        </div>
        <div id="con">
            <a href="https://github.com/McdheYxY/" target="_blank">
                <img src="/img/github.svg">
            </a>
            <a href="https://space.bilibili.com/1034153162" target="_blank">
                <img src="/img/bilibili.svg">
            </a>
            <a href="/feed.xml" target="_blank">
                <img src="/img/rss.svg">
            </a>
        </div>
    </div>
</template>
<style scoped>
#container {
    max-width: 38rem;
    width: 100%;
    height: 100%;
    max-height: 28rem;
    background-color: rgb(218, 232, 252, 0.5);
    box-shadow: 0 0 9px 1px #5499de;
    backdrop-filter: blur(1px);
    border: 1px solid #5499de;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 9rem 5rem 2rem;
    box-sizing: border-box;
    overflow-y: auto;
}

#container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    animation: anim-cover 0.4s ease-out 0.4s forwards;
}

#container #header {
    position: absolute;
    top: 2.3rem;
    left: 3rem;
}

#container #header h1 {
    font-size: 2rem;
    line-height: 1.6rem;
    letter-spacing: calc(0.1rem + 0.7vmin);
    margin: 0;
}

#container #header p {
    font-size: 1rem;
    line-height: 2.5rem;
    letter-spacing: 0.22rem;
}

#content a {
    display: block;
    position: relative;
    width: 100%;
    height: 3.6rem;
    line-height: 3.6rem;
    text-decoration: none;
    color: black;
    letter-spacing: 0.22rem;
    text-align: center;
    transition: color 0.2s ease-out, background 0.5s ease-out;
}

#content a:nth-child(1) {
    background-color: #fff2cc;
    border: 1px solid #d6b656;
}

#content a:nth-child(2) {
    margin: 2.3rem 0;
    background-color: #f8cecc;
    border: 1px solid #b85450;
}

#content a:nth-child(3) {
    margin: 1rem 0;
    background-color: #e1d5e7;
    border: 1px solid #9673a6;
}

#con {
    position: absolute;
    top: 2rem;
    right: 3rem;
}

#con a {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 0.7rem;
}

#con a:nth-child(1) {
    background-color: #bac9d4;
    border: 1px solid #23445d;
}

#con a:nth-child(2) {
    background-color: #d0cee2;
    border: 1px solid #56517e;
    margin: 0 0.3rem;
}

#con a:nth-child(3) {
    background-color: #b1ddf0;
    border: 1px solid #10739e;
}

#con a img {
    width: 1.4rem;
    height: 1.4rem;
    margin: calc(0.3rem - 1px);
}


@media (max-width: 608px) {
    #container {
        padding: 9rem 2rem 2rem;
    }

    #container #header {
        left: 1.5rem;
    }

    #con {
        right: 1.5rem;
    }
}

@media (min-width: 608px) {
    #content a::before {
        content: "";
        position: absolute;
        display: block;
        width: 0%;
        height: 100%;
        top: 0;
        right: 0;
        transition: width 0.3s cubic-bezier(0.33, 1, 0.68, 1);
        z-index: -1;
    }

    #content a:nth-child(1)::before {
        background-color: #d6b656;
    }

    #content a:nth-child(2)::before {
        background-color: #b85450;
    }

    #content a:nth-child(3)::before {
        background-color: #9673a6;
    }

    #content a:hover::before {
        width: 100%;
        right: auto;
        left: 0;
    }

    #content a:hover {
        color: white;
        background-color: rgba(0, 0, 0, 0);
    }
}

@keyframes anim-cover {
    0% {
        width: 100%;
        left: 0;
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    20% {
        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    40% {
        opacity: 0;
    }

    50% {
        width: 100%;
        left: 0;
        opacity: 1;
    }

    75% {
        width: 100%;
        left: auto;
        right: 0;
    }

    100% {
        width: 0;
        left: auto;
        right: 0;
        opacity: 1;
    }
}
</style>