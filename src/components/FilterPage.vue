<template>
  <div class="relative w-full max-w-full mx-0 bg-[rgb(238_242_255)] z-0">
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
        url="/"
        :icon="active[index] ? IconRemove : null"
        @click="toggleActive(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import IconRemove from '@/components/icons/IconRemove.vue'

const buttons = ['Restauration', 'Beauté', 'Loisirs', 'Sport & Bien-être', 'Technologie', 'Mode']
const carousel = ref<HTMLElement | null>(null)
const active = ref(buttons.map(() => false))
const emit = defineEmits(['filterChange'])

const toggleActive = (index: number) => {
  if (active.value[index]) {
    // Si le bouton est déjà actif, le désactiver
    active.value[index] = false
  } else {
    // Sinon, désactiver tous les boutons et activer celui sur lequel on a cliqué
    active.value = active.value.map(() => false)
    active.value[index] = true
  }
  emit('filterChange', { filter: buttons[index], active: active.value[index] })
}
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
