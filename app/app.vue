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

.fade-in-up-leave-active,
.fade-in-up-enter-active {
  overflow: hidden;
  transition: opacity .2s cubic-bezier(.4, 0, .2, 1), transform .2s cubic-bezier(.4, 0, .2, 1) !important;
}

/* .fade-in-enter-from {
  opacity: 0 !important;
  transform: scale(.7) !important;
} */
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0 !important;
  transform: translate(-50%, -50%) scale(.7) !important;
}

.fade-in-leave-active,
.fade-in-enter-active {
  overflow: hidden;
  transition: opacity .2s cubic-bezier(.4, 0, .2, 1), transform .2s cubic-bezier(.4, 0, .2, 1) !important;
}
</style>