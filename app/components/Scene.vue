<script setup>
defineEmits(['clicklBackground'])
</script>
<template>
    <Transition name="fade">
        <div>
            <div class="scene_cover" @click="$emit('clicklBackground')"></div>
            <div class="scene">
                <div class="scene_in">
                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scene {
    z-index: 900;
    width: 100%;
    max-width: 600px;
    color: var(--article-text-color);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.scene_in {
    width: 100%;
    max-width: 600px;
    padding: 0.9rem;
    display: inline-block;
    background-color: var(--background-color);
    box-sizing: border-box;
}

.scene_cover {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 500;
}
</style>