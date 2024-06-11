<template>
  <div class="relative w-full max-w-full mx-0 bg-[rgb(238_242_255)]">
    <!-- <button 
      @click="scrollCarousel(-200)" 
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hidden md:block">
      &#8592;
    </button> -->
    <div
      ref="carousel"
      class="flex justify-start space-x-4 py-5 overflow-hidden hide-scrollbar cursor-grab active:cursor-grabbing"
      @mousedown="startDrag"
      @mouseleave="stopDrag"
      @mouseup="stopDrag"
      @mousemove="drag"
      @touchstart="startTouch"
      @touchmove="moveTouch"
    >
      <Button
        v-for="(button, index) in buttons"
        :key="index"
        class="rounded bg-[#e3e3e3] shadow-lg focus:outline-none hover:bg-gray-200"
        :text="button"
        variant="filter"
        :url="buttonPaths[index]"
        :icon="$route.path === buttonPaths[index] ? IconRemove : null"
      />
    </div>
    <!-- <button 
      @click="scrollCarousel(200)" 
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hidden md:block">
      &#8594;
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import IconRemove from '@/components/icons/IconRemove.vue'

const buttons = ['Tout', 'Restauration', 'Beauté', 'Cinéma', 'Coiffeur', 'Loisirs']
const buttonPaths = ['/', '/restauration', '/beaute', '/cinema', '/coiffeur', '/loisirs']
const carousel = ref<HTMLElement | null>(null)

const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const scrollCarousel = (distance: number) => {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: distance,
      behavior: 'smooth'
    })
  }
}

const startDrag = (e: MouseEvent) => {
  isDown.value = true
  startX.value = e.pageX - (carousel.value?.offsetLeft ?? 0)
  scrollLeft.value = carousel.value?.scrollLeft ?? 0
}

const stopDrag = () => {
  isDown.value = false
}

const drag = (e: MouseEvent) => {
  if (!isDown.value) return
  e.preventDefault()
  const x = e.pageX - (carousel.value?.offsetLeft ?? 0)
  const walk = (x - startX.value) * 2
  if (carousel.value) {
    carousel.value.scrollLeft = scrollLeft.value - walk
  }
}

const startTouch = (e: TouchEvent) => {
  startX.value = e.touches[0].pageX - (carousel.value?.offsetLeft ?? 0)
  scrollLeft.value = carousel.value?.scrollLeft ?? 0
}

const moveTouch = (e: TouchEvent) => {
  const x = e.touches[0].pageX - (carousel.value?.offsetLeft ?? 0)
  const walk = (x - startX.value) * 2
  if (carousel.value) {
    carousel.value.scrollLeft = scrollLeft.value - walk
  }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
</style>
