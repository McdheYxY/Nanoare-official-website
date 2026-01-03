<script setup>
const props = defineProps({
    anchors: {
        type: Array,
        default: []
    }
})

const AnchorNavApp = {
    nav: null,
    dictNav: null,
    dictNavBtn: null,
    lists: null,
    comment: null,
    getNavEl() {
        if (!this.nav) this.nav = document.getElementById("dictNav");
        return this.nav;
    },
    getDictNavEl() {
        if (!this.dictNav) this.dictNav = document.getElementById("dictNav");
        return this.dictNav;
    },
    getDictNavBtnEl() {
        if (!this.dictNavBtn) this.dictNavBtn = document.getElementById("dictNavBtn");
        return this.dictNavBtn;
    },
    getListsEl() {
        if (!this.lists) this.lists = document.getElementById("dictNavList");
        return this.lists;
    },
    getCommentEl() {
        if (!this.comment) this.comment = document.querySelector(".comments");
        return this.comment;
    },
    /* 动态设置dictNavList高度，添加dictNavBtn点击事件 */
    initDictNav() {
        //初始化元素
        this.getNavEl()
        this.getDictNavEl()
        this.getDictNavBtnEl()
        this.getListsEl()
        this.getCommentEl()
        if (!!this.dictNav) {
            this.initPosition()
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
        //注册事件
        this.dictNav.addEventListener("transitionrun", this.idn1);
        this.dictNav.addEventListener("transitionend", this.idn2);
        this.lists.addEventListener("transitionend", this.idn3);
        window.addEventListener("keydown", this.keydownTab)
    },
    uninstall() {
        document.removeEventListener("orientationchange", this.ipt1)
        document.removeEventListener("scroll", this.ipt1)

        this.dictNav.removeEventListener("transitionrun", this.idn1)
        this.dictNav.removeEventListener("transitionend", this.idn2)
        this.lists.removeEventListener("transitionend", this.idn3)

        this.dictNav.removeEventListener("click", this.idn4)
        this.lists.removeEventListener("click", this.idn5)
        window.removeEventListener("keydown", this.keydownTab)
    },
    /* 初始化nav的位置、提交监听实际 */
    initPosition() {
        this.setEleTop(this.nav);
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
    },
    /* 设置元素距离文档的高度 */
    setEleTop(ele) {
        //https://segmentfault.com/a/1190000008065472
        var bodyScrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        ele.style.top = Math.min(Math.ceil(window.innerHeight - ele.offsetHeight - 80) +
            bodyScrollTop, this.comment.offsetTop) +
            "px";
    },
    /* 按下Tab打开锚点导航 */
    keydownTab(e) {
        if (e.key.indexOf('Tab') != -1)
            AnchorNavApp.idn4(e);
    },
    ipt1() {//initPosition方法下的orientationchange与scroll回调
        AnchorNavApp.setEleTop(AnchorNavApp.nav);
    },
    idn1() {//initDictNav方法下的transitionrun
        AnchorNavApp.dictNavBtn.style.backgroundPosition = "-48px 0";
    },
    idn2() {//initDictNav方法下的transitionend
        AnchorNavApp.dictNavBtn.style.backgroundPosition = "0 0";
    },
    idn3() {//initDictNav方法下的transitionend2
        if (!AnchorNavApp.dictNavBtn.className) {
            AnchorNavApp.lists.style.display = "none";
        }
    },
    idn4(e) {//initDictNav方法下的click
        var num = props.anchors.length,
            maxNum = 8,
            showHeight,
            borderHeight = 1;
        if (
            AnchorNavApp.lists.style.display === "none" ||
            window
                .getComputedStyle(AnchorNavApp.lists, null)
                .getPropertyValue("display") == "none"
        ) {
            //js添加的是内联样式，css文件需要调用后者方法
            AnchorNavApp.dictNavBtn.className += "selected";
            AnchorNavApp.lists.style.display = "block";
            AnchorNavApp.lists.style.opacity = 1;
        } else if (AnchorNavApp.lists.style.display === "block") {
            AnchorNavApp.dictNavBtn.className = "";
            AnchorNavApp.lists.style.height = "0px";
            AnchorNavApp.lists.style.opacity = 0;
        }
        if (AnchorNavApp.lists.style.display == "block") {
            var liChildHight =
                AnchorNavApp.lists.querySelector("li").clientHeight + borderHeight;
            showHeight =
                num >= maxNum ? liChildHight * maxNum : liChildHight * num;
        }
        if (num > maxNum) {
            AnchorNavApp.lists.style.overflowY = "scroll";
        }
        var listheightStyle = window
            .getComputedStyle(AnchorNavApp.lists, null)
            .getPropertyValue("height");
        if (listheightStyle == "0px") {
            AnchorNavApp.lists.style.height = showHeight + "px";
        }
        e.preventDefault();
        e.stopPropagation();
    },
    idn5(e) {
        if (e.target.nodeName.toLowerCase() == "a") {
            // var navDictId = e.target.href.split("#")[1];
            AnchorNavApp.lists.style.height = "0px";
            AnchorNavApp.lists.style.opacity = 0;
            AnchorNavApp.dictNavBtn.className = "";
            e.stopPropagation();
        }
    }
}


onMounted(async () => {
    await nextTick();
    //初始化锚点导航
    AnchorNavApp.initDictNav();
    document.body.classList.add('scrollSmooth');
    document.documentElement.classList.add('scrollSmooth');
})
onUnmounted(() => {
    //卸载锚点导航
    AnchorNavApp.uninstall();
    // TODO 这里不该出现下面两行代码，需要做功能分离
    document.body.classList.remove('scrollSmooth');
    document.documentElement.classList.remove('scrollSmooth');
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