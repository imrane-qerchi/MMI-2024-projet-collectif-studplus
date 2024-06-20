<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import offerCard from '@/components/offerCard.vue'
import { getFullListFilteredLiked } from '@/backend'
import IconLikeillus from '@/components/icons/IconLikeillus.vue'

import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import { ref, onMounted, nextTick } from 'vue'
const router = useRouter()

const currentuser = ref()

onMounted(async () => {
  currentuser.value = pb.authStore.isValid ? pb.authStore.model : null

  if (!currentuser.value) {
    router.replace('/connexion')
  }

  await fetchFavoris(currentuser.value?.id)
})

const favoris = ref<string[]>([])

async function fetchFavoris(userId: string | null) {
  if (!userId) return
  try {
    const user = await pb.collection('users').getOne(userId)
    const favorisIds = user.favoris || []
    favoris.value = favorisIds
    console.log('Favoris fetched:', favoris.value)
    await nextTick() // Ajoutez cette ligne
  } catch (error) {
    console.error('Failed to fetch favoris:', error)
  }
}

function isFavorite(id: string) {
  return favoris.value.includes(id)
}

const cardLiked = await getFullListFilteredLiked(pb.authStore.model.id)
</script>

<template>
  <div class="relative overflow-x-hidden bg-[rgb(238_242_255)]">
    <IconLikeillus />
    <div class="container pt-10 pb-32 space-y-20">
      <div class="flex flex-col gap-10">
        <div class="relative flex justify-between items-center w-full">
          <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Mes offres fav'</h1>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <offerCard
            v-for="card in cardLiked"
            v-bind="card"
            v-bind:key="card.id"
            :isFavori="isFavorite(card.id)"
            :userid="pb.authStore.model.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
