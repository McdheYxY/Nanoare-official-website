<script setup>
// TODO 这个文档访问次数较多，页面所需的数据对每个用户来说都是相同的。更多：https://cn.vuejs.org/guide/scaling-up/ssr.html#ssr-vs-ssg
// const runtimeConfig = useRuntimeConfig()
useHead({
    title: 'Nanoare official website',
    meta: [
        {
            name: 'description', content: 'Nanoare 的网络日志(blogs)、编程日记(notes)、作品合集(projects)发布页'
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
            property: 'og:description', content: 'Nanoare 的网络日志(blogs)、编程日记(notes)、作品合集(projects)发布页'
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                </svg>
            </a>
            <a href="https://space.bilibili.com/1034153162" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373.375.374.4.96v1.173q-.025.586-.4.96-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947.387-.386.947-.386m8 0q.56 0 .933.373.375.374.4.96v1.173q-.025.586-.4.96-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96.373-.373.933-.373" />
                </svg>
            </a>
            <a href="https://afdian.com/a/nanoare" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M9 14.234a.567.567 0 1 0 0 1.134.567.567 0 0 0 0-1.134m5.351 1.705a.567.567 0 1 0 0 1.135.567.567 0 0 0 0-1.135m8.401 1.436c-.189.095-.461.1-.713.013-.169-.06-.352-.116-.534-.172-.339-.104-.904-.276-1.011-.407a.533.533 0 1 0-.853.643c.059.08.139.146.22.209-.816 1.131-4.398 3.382-9.464 2.273-2.283-.5-3.819-1.413-4.444-2.639-.451-.885-.348-1.797-.133-2.293.62-1.29 5.097-4.261 7.955-5.943a.537.537 0 0 0 .188-.733c-.149-.254-.49-.356-.73-.189-.231.135-1.015.601-2.015 1.236-.338-.227-.923-.508-1.86-.6-1.486-.148-4.92-.805-6.029-1.275C2.535 7.162.731 6.27 1.131 5.267c.092-.234.527-.613 1.47-.974a8.5 8.5 0 0 1 1.995-.492l-.212.103c-.642.312-1.343.662-1.813 1.075-.034-.022-.07-.044-.094-.069a.527.527 0 0 0-.754-.017.533.533 0 0 0-.017.756c.19.2.471.35.829.465l.039.014c1.245.383 3.458.336 6.578.211 1.345-.052 2.615-.102 3.674-.082 3.512.07 6.152 1.469 8.07 4.279 1.178 1.725.753 3.426.079 4.903a1.4 1.4 0 0 1-.231-.222.54.54 0 0 0-.75-.085.535.535 0 0 0-.086.751c.109.137.665.778 1.355.724l.037-.002c.021-.003.042.001.064-.003.472-.086.768-.063 1.045.111.367.232.547.37.511.485-.021.073-.076.125-.168.177M8.19 11.418l-.315.231a1.6 1.6 0 0 1-.243-.32c.123-.038.33.007.558.089m14.733 4.356a1.9 1.9 0 0 0-.81-.27c.632-1.544 1.034-3.565-.336-5.572-2.096-3.072-5.101-4.668-8.93-4.744-1.091-.022-2.377.029-3.737.083-1.58.063-3.683.145-5.112.027.285-.155.588-.304.851-.431 1.006-.49 1.797-.872 1.535-1.548-.137-.396-.547-.603-1.219-.618C3.748 2.669.688 3.489.138 4.872c-.31.779-.361 2.282 2.775 3.61 1.29.548 4.934 1.216 6.341 1.355.397.039.701.119.931.205a75 75 0 0 0-.986.664c-.577-.329-1.521-.718-2.226-.237a.94.94 0 0 0-.435.768c-.01.385.224.763.486 1.066-1.038.83-1.877 1.634-2.175 2.253-.332.762-.467 2.008.153 3.224.786 1.544 2.524 2.62 5.166 3.199 3.454.755 6.437.075 8.411-.966 1.099-.579 1.878-1.27 2.257-1.887l.356.113c.169.051.338.103.496.159.522.181 1.1.157 1.545-.068l.025-.013c.336-.177.577-.46.683-.803.285-.922-.528-1.432-1.018-1.74" />
                </svg>
            </a>
        </div>
    </div>
    <!-- <BgVideo bvid="BV1oG4y1r7PB"/> -->
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
    color: #23445d;
}

#con a:nth-child(2) {
    background-color: #d0cee2;
    border: 1px solid #56517e;
    margin: 0 0.3rem;
    color: #56517e;
}

#con a:nth-child(3) {
    background-color: #b1ddf0;
    border: 1px solid #10739e;
    color: #10739e;
}

#con a svg {
    width: 1.5rem;
    height: 1.5rem;
    margin: calc(0.25rem - 1px);
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