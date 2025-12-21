<script setup>
const title = ref()

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function titleChange() {
    console.log(title.value.innerText);
}
onMounted(()=>{
    console.log(getCookie('access_token'));
    
})

</script>
<template>
    <NuxtLayout name="nano" :Save="getCookie('access_token')" :admin="!getCookie('access_token')">
        <template #title>
            <span ref="title" @input="titleChange()" contenteditable="true">标题</span>
        </template>
        <TuiEditor />
    </NuxtLayout>
</template>
<style></style>