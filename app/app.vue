<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>
// 为了保留进度条特意保留此vue文件
</script>
<style>
.fade-in-up-enter-from,
.fade-in-up-leave-to {
  opacity: 0 !important;
  transform: translateY(1rem) !important;
}

.fade-in-up-leave-active {
  overflow: hidden;
  transition:opacity .2s cubic-bezier(.4, 0, .2, 1), transform .2s cubic-bezier(.4, 0, .2, 1) !important;
}

.fade-in-up-enter-active {
  overflow: hidden;
  transition:opacity .2s .3s cubic-bezier(.4, 0, .2, 1), transform .2s cubic-bezier(.4, 0, .2, 1) !important;
}
</style>