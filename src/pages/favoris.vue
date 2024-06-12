<script setup lang="ts">
import offerCard from '@/components/offerCard.vue'
import { getFullListFilteredLiked } from '@/backend'

const cardLiked = await getFullListFilteredLiked()
</script>

<template>
  <div class="relative overflow-x-hidden bg-[rgb(238_242_255)]">
    <div class="container pt-10 pb-32 space-y-20">
      <div class="flex flex-col gap-10">
        <div class="relative flex justify-between items-center w-full">
          <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Mes offres fav'</h1>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <offerCard v-for="card in cardLiked" v-bind="card" v-bind:key="card.id" />
        </div>
      </div>
    </div>
  </div>
</template>
