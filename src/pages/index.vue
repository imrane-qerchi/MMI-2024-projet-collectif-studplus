<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import offerCard from '@/components/offerCard.vue'
import { getFullListFilteredCertified } from '@/backend'
import IconCertif from '@/components/icons/IconCertif.vue'
import FilterPage from '@/components/FilterPage.vue'

const cardCertified = await getFullListFilteredCertified()
</script>

<template>
  <FilterPage />
  <div class="relative overflow-x-hidden bg-[rgb(238_242_255)]">

    <IconCertif/>

    <div class="container py-10 space-y-8">

      <div class="relative flex justify-between items-center w-full">
        <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Découvrez nos partenaires</h1>
      </div>

      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <offerCard v-for="card in cardCertified" v-bind="card" />
      </div>

    </div>
  </div>
</template>
