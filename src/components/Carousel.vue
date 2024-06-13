<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const carousel = ref<HTMLElement | null>(null)
const screens = ref([
  { id: 'ecran-1', src: '/src/img/o41.jpeg', alt: 'image_1_carousel' },
  { id: 'ecran-2', src: '/src/img/darty.jpg', alt: 'image_2_carousel' },
  { id: 'ecran-3', src: '/src/img/decathlon.png', alt: 'image_3_carousel' },
  { id: 'ecran-4', src: '/src/img/newgallery.jpg', alt: 'image_4_carousel' }
])

const nextSlide = () => {
  if (carousel.value) {
    carousel.value.scrollLeft += carousel.value.clientWidth
  }
}

const prevSlide = () => {
  if (carousel.value) {
    carousel.value.scrollLeft -= carousel.value.clientWidth
  }
}

const onScroll = () => {
  // Pour ajouter de la logique si on veux suivre la diapositive actuelle ou une autre fonctionnalité
}

onMounted(() => {
  // Ajouter une logique d'enjambement si nécessaire
})
</script>

<template>
  <section>
    <div class="relative">
    <button
      class="absolute top-1/2 transform -translate-y-1/2 left-0 w-8 h-8 opacity-70 rounded-full border-none grid place-content-center m-2"
      aria-label="slide précedant"
      @click="prevSlide"
    >
      &lt;
    </button>
    <button
      class="absolute top-1/2 transform -translate-y-1/2 right-0 w-8 h-8 opacity-70 rounded-full border-none grid place-content-center m-2"
      aria-label="slide suivant"
      @click="nextSlide"
    >
      >
    </button>
    <div
      class="flex w-full overflow-x-scroll scroll-smooth scroll-snap-x mandatory"
      ref="carousel"
      @scroll="onScroll"
    >
      <div v-for="screen in screens" :key="screen.id" :id="screen.id" class="w-full flex-none scroll-snap-start">
        <figure>
          <img :src="screen.src" :alt="screen.alt" />
        </figure>
      </div>
    </div>
  </div>
  </section>
</template>