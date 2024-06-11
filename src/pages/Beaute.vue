<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import offerCard from '@/components/offerCard.vue'
import { getFullListFilteredBeaute } from '@/backend'
import { getFullListFilteredWithoutCertified } from '@/backend'
import FilterPage from '@/components/FilterPage.vue'

const cardBeaute = await getFullListFilteredBeaute()
const cardWithoutCertified = await getFullListFilteredWithoutCertified()
</script>

<template>
  <FilterPage />
  <div class="relative overflow-x-hidden bg-[rgb(238_242_255)]">
    <IconCertif />

    <div class="container pt-10 pb-32 space-y-20">
      <div class="flex flex-col gap-10">
        <div class="relative flex justify-between items-center w-full">
          <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Découvrez nos offres Beauté</h1>
        </div>

        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <offerCard v-for="card in cardBeaute" v-bind="card" v-bind:key="card.id" />
        </div>
      </div>

      <div class="flex flex-col gap-10">
        <div class="relative flex justify-between items-center w-full">
          <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">À Découvrir</h1>
        </div>

        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <offerCard v-for="card in cardWithoutCertified" v-bind="card" v-bind:key="card.id" />
        </div>
      </div>
    </div>
  </div>
</template>
