<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import { ref, onMounted } from 'vue'
import offerCard from '@/components/offerCard.vue'
import {
  getFullListFilteredCertified,
  getFullListFilteredWithoutCertified,
  getFullListFilteredBeaute,
  getFullListFilteredLoisirs,
  getFullListFilteredMode,
  getFullListFilteredSport,
  getFullListFilteredTechnologie,
  getFullListFilteredRestauration
} from '@/backend'
import IconCertif from '@/components/icons/IconCertif.vue'
import FilterPage from '@/components/FilterPage.vue'

const cardCertified = await getFullListFilteredCertified()
const cardWithoutCertified = await getFullListFilteredWithoutCertified()
const cardBeaute = await getFullListFilteredBeaute()
const cardRestauration = await getFullListFilteredRestauration()
const cardLoisirs = await getFullListFilteredLoisirs()
const cardSport = await getFullListFilteredSport()
const cardTechnologie = await getFullListFilteredTechnologie()
const cardMode = await getFullListFilteredMode()

const currentFilter = ref('')
const displayedCards = ref(cardCertified)
const isCertifiedDisplayed = ref(true)

const handleFilterChange = (filter: any) => {
  if (filter.active) {
    currentFilter.value = filter.filter
    switch (filter.filter) {
      case 'Restauration':
        displayedCards.value = cardRestauration
        isCertifiedDisplayed.value = false
        break
      case 'Beauté':
        displayedCards.value = cardBeaute
        isCertifiedDisplayed.value = false
        break
      case 'Loisirs':
        displayedCards.value = cardLoisirs
        isCertifiedDisplayed.value = false
        break
      case 'Sport & Bien-être':
        displayedCards.value = cardSport
        isCertifiedDisplayed.value = false
        break
      case 'Technologie':
        displayedCards.value = cardTechnologie
        isCertifiedDisplayed.value = false
        break
      case 'Mode':
        displayedCards.value = cardMode
        isCertifiedDisplayed.value = false
        break
      // Handle other cases...
      default:
        displayedCards.value = cardCertified
        isCertifiedDisplayed.value = true
    }
  } else {
    currentFilter.value = ''
    displayedCards.value = cardCertified
    isCertifiedDisplayed.value = true
  }
}

const router = useRouter()

const currentuser = ref()

onMounted(async () => {
  currentuser.value = pb.authStore.isValid ? pb.authStore.model : null

  if (!currentuser.value) {
    router.replace('/connexion')
  }
})
</script>

<template>
  <FilterPage @filterChange="handleFilterChange" />
  <div class="relative overflow-x-hidden bg-[rgb(238_242_255)]">
    <IconCertif v-if="isCertifiedDisplayed" />
    <div class="container pt-10 pb-32 space-y-20">
      <div class="flex flex-col gap-10">
        <div class="relative flex justify-between items-center w-full">
          <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">
            Découvrez nos offres {{ currentFilter || 'partenaires' }}
          </h1>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <offerCard v-for="card in displayedCards" v-bind="card" v-bind:key="card.id" />
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
