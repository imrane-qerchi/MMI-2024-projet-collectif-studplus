<script setup lang="ts">
import { onErrorCaptured } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterLink, RouterView } from 'vue-router/auto'
import HeaderPage from './components/HeaderPage.vue'
import FooterPage from './components/FooterPage.vue';

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})
</script>

<template>
  <HeaderPage />
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" :key="$route.path" />
    </Suspense>
  </RouterView>
  <FooterPage/>
</template>
