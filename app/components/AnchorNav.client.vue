<script setup>
const props = defineProps({
    anchors: {
        type: Array,
        default: []
    }
})
/* 设置元素距离文档的高度 */
var setEleTop = function (ele) {
    //https://segmentfault.com/a/1190000008065472
    var bodyScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    ele.style.top = Math.min(Math.ceil(window.innerHeight - ele.offsetHeight - 80) +
        bodyScrollTop, ctx.comment.offsetTop) +
        "px";
};


/* 初始化nav的位置、提交监听实际 */
var initPosition = function () {
    setEleTop(this.nav);
    document.addEventListener(
        "orientationchange", //用户旋转屏幕
        this.ipt1,
        false
    );
    document.addEventListener(
        "scroll",
        this.ipt1,
        false
    );
};



/* 动态设置dictNavList高度，添加dictNavBtn点击事件 */
function initDictNav() {
    this.dictNav.addEventListener("transitionrun", this.idn1);
    this.dictNav.addEventListener("transitionend", this.idn2);
    this.lists.addEventListener("transitionend", this.idn3);
    if (!!this.dictNav) {
        initPosition.call(this);
        if (!!this.dictNavBtn) {
            this.dictNavBtn.addEventListener(
                "click",
                this.idn4,
                false
            );
        }
        /* list a标签事件委托*/
        this.lists.addEventListener(
            "click",
            this.idn5,
            false
        );
    }
};
let ctx = {}
onMounted(async () => {
    await nextTick()
    ctx = {
        nav: document.getElementById("dictNav"),
        dictNav: document.getElementById("dictNav"),
        dictNavBtn: document.getElementById("dictNavBtn"),
        lists: document.getElementById("dictNavList"),
        comment: document.querySelector(".comments"),
        ipt1() {//initPosition方法下的orientationchange与scroll回调
            setEleTop(ctx.nav);
        },
        idn1() {//initDictNav方法下的transitionrun
            ctx.dictNavBtn.style.backgroundPosition = "-48px 0";
        },
        idn2() {//initDictNav方法下的transitionend
            ctx.dictNavBtn.style.backgroundPosition = "0 0";
        },
        idn3() {//initDictNav方法下的transitionend2
            if (!ctx.dictNavBtn.className) {
                ctx.lists.style.display = "none";
            }
        },
        idn4(e) {//initDictNav方法下的click
            var num = props.anchors.length,
                maxNum = 8,
                showHeight,
                borderHeight = 1;
            if (
                ctx.lists.style.display === "none" ||
                window
                    .getComputedStyle(ctx.lists, null)
                    .getPropertyValue("display") == "none"
            ) {
                //js添加的是内联样式，css文件需要调用后者方法
                ctx.dictNavBtn.className += "selected";
                ctx.lists.style.display = "block";
                ctx.lists.style.opacity = 1;
            } else if (ctx.lists.style.display === "block") {
                ctx.dictNavBtn.className = "";
                ctx.lists.style.height = "0px";
                ctx.lists.style.opacity = 0;
            }
            if (ctx.lists.style.display == "block") {
                var liChildHight =
                    ctx.lists.querySelector("li").clientHeight + borderHeight;
                showHeight =
                    num >= maxNum ? liChildHight * maxNum : liChildHight * num;
            }
            if (num > maxNum) {
                ctx.lists.style.overflowY = "scroll";
            }
            var listheightStyle = window
                .getComputedStyle(ctx.lists, null)
                .getPropertyValue("height");
            if (listheightStyle == "0px") {
                ctx.lists.style.height = showHeight + "px";
            }
            e.preventDefault();
            e.stopPropagation();
        },
        idn5(e) {
            if (e.target.nodeName.toLowerCase() == "a") {
                // var navDictId = e.target.href.split("#")[1];
                ctx.lists.style.height = "0px";
                ctx.lists.style.opacity = 0;
                ctx.dictNavBtn.className = "";
                e.stopPropagation();
            }
        }
    }
    initDictNav.call(ctx);
    document.body.classList.add('scrollSmooth')
    document.documentElement.classList.add('scrollSmooth')
})
onUnmounted(() => {
    document.removeEventListener("orientationchange", ctx.ipt1)
    document.removeEventListener("scroll", ctx.ipt1)

    ctx.dictNav.removeEventListener("transitionrun", ctx.idn1)
    ctx.dictNav.removeEventListener("transitionend", ctx.idn2)
    ctx.lists.removeEventListener("transitionend", ctx.idn3)

    ctx.dictNav.removeEventListener("click", ctx.idn4)
    ctx.lists.removeEventListener("click", ctx.idn5)
    // TODO 这里不该出现下面两行代码，需要做功能分离
    document.body.classList.remove('scrollSmooth')
    document.documentElement.classList.remove('scrollSmooth')
})


</script>

<template>
    <div id="dictNav">
        <ul id="dictNavList">
            <li v-for="anchor in props.anchors">
                <nuxt-link :to="{ hash: anchor.hash }" :style="{ textIndent: `${anchor.level - 2}rem` }">{{ anchor.title
                    }}</nuxt-link>
            </li>
        </ul>
        <a id="dictNavBtn" href="#"></a>
    </div>
</template>
<style>
#dictNav,
#dictNavList {
    position: absolute;
    right: 7px;
}

#dictNavList a {
    white-space: pre;
}

/* 为 Chrome、Safari 和 Opera 隐藏滚动条 */
/* #dictNavList::-webkit-scrollbar {
    display: none;
} */

#dictNav {
    top: 350px;
    transition: all .3s;
    z-index: 20;
}

#dictNavBtn {
    display: inline-block;
    background-image: url(/img/navbtn.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 96px 48px;
    width: 48px;
    height: 0;
    padding-top: 48px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #bdbdbd;
    box-shadow: 0 1px 3px var(--article-text-color);
}

#dictNavBtn.selected {
    background-position: 64px 0;
}

#dictNavList {
    right: 0;
    bottom: 60px;
    width: 200px;
    height: 0;
    background: rgba(7, 9, 12, 0.8);
    transition: all 0.3s ease-in-out;
    display: none;
    opacity: 0;
    /* -ms-overflow-style: none; */
    /* IE and Edge */
    /* scrollbar-width: none; */
    /* Firefox */
    scrollbar-width: thin;
    overflow: hidden;
}

#dictNav ul {
    list-style: none;
}

#dictNav ul,
#dictNav li {
    margin: 0;
    padding: 0;
}

#dictNavList li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

#dictNavList li a {
    color: #fff;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 7px;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
}

.scrollSmooth {
    scroll-behavior: smooth;
}
</style>