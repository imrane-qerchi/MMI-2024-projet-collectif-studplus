<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="min-h-screen bg-[rgb(238_242_255)] flex flex-col items-center justify-center">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-2xl mb-8">Page {{ $route.fullPath }} Non Trouvée</p>
    <Button
      class=""
      text="Accueil"
      variant="default"
      size="large"
      url="/"
    />
  </div>
</template>
