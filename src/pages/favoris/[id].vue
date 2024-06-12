<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { pb } from '@/backend'
import { useRoute } from 'vue-router/auto'
import type { CardResponse } from '@/pocketbase-types'
import type { UsersResponse } from '@/pocketbase-types'
import IconReturn from '@/components/icons/IconReturn.vue'
import IconCertif2 from '@/components/icons/IconCertif2.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconPin from '@/components/icons/IconPin.vue'
import { ref } from 'vue'

const route = useRoute('/favoris/[id]')
const infoCard: CardResponse<any> = await pb.collection('Card').getOne(route.params.id)
const imageHero = await pb.getFileUrl(infoCard, infoCard.image)

const users = await pb.collection('Users').getFullList()
const likedCardsCount = ref(0)

likedCardsCount.value = users.filter(
  (users) => users.favoris && users.favoris.includes(infoCard.id)
).length

function fixeFavoriPourID(fav: boolean, id: string) {
  console.log(fav, id)
  pb.collection('Card').update(id, { fav: fav })
  location.reload()
}
</script>

<template>
  <div
    class="relative w-full h-[20vh] lg:h-[30vh] bg-cover bg-center"
    :style="{ backgroundImage: `url(${imageHero})` }"
  >
    <div class="flex justify-between p-5">
      <IconReturn />

      <svg
        @click="fixeFavoriPourID(!infoCard.fav, infoCard.id)"
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="z-20"
        preserveAspectRatio="none"
      >
        <circle
          cx="23"
          cy="23"
          r="22.566"
          stroke="#694C9B"
          stroke-opacity="0.25"
          stroke-width="0.867925"
          fill="white"
          fill-opacity="0.80"
        ></circle>
        <path
          d="M30.6308 17.8587C31.4956 18.7269 31.9811 19.9025 31.9811 21.128C31.9811 22.3534 31.4956 23.529 30.6308 24.3973L23.4883 31.5963L16.3459 24.3973C15.7036 23.7506 15.2663 22.9289 15.0887 22.0349C14.9112 21.1409 15.0013 20.2144 15.3478 19.3714C15.6942 18.5284 16.2817 17.8063 17.0366 17.2956C17.7914 16.7848 18.6802 16.5081 19.5916 16.5C20.8103 16.5074 21.9768 16.9957 22.8373 17.8587C23.0883 18.107 23.307 18.386 23.4883 18.689C23.6696 18.386 23.8884 18.107 24.1393 17.8587C24.5633 17.4285 25.0686 17.0869 25.6258 16.8537C26.183 16.6205 26.781 16.5004 27.385 16.5004C27.9891 16.5004 28.5871 16.6205 29.1443 16.8537C29.7015 17.0869 30.2068 17.4285 30.6308 17.8587Z"
          :fill="infoCard.fav ? '#694C9B' : 'transparent'"
          stroke="#694C9B"
          stroke-width="1.41509"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
  </div>

  <div class="flex flex-col gap-2 py-7">
    <div class="flex justify-center gap-1">
      <h1>{{ infoCard.nom }}</h1>
      <IconCertif2 class="w-5 h-auto" v-if="infoCard.certified" />
    </div>

    <div class="flex justify-center flex-row items-center gap-2">
      <p class="text-[15px] font-semibold text-left text-[#858585]">
        {{ infoCard.type }}
      </p>
      |
      <p class="text-[15px] font-semibold text-left text-[#858585]">
        {{ infoCard.ville }}
      </p>
    </div>
  </div>

  <div class="flex flex-col px-5 py-16 gap-10 bg-[#E3E3E3]">
    <div class="flex flex-col gap-10">
      <h1 class="max-w-fit text-[34px] border-b-2 pb-3 border-[#694C9B]">Hmm.. Voyons voir</h1>
      <h2>Avec la carte étudiante vous pouvez bénéficier ...</h2>
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <h3 class="text-[#694C9B]">{{ infoCard.description }}</h3>
        <div v-if="infoCard.newPrice && infoCard.oldPrice" class="flex gap-2">
          <p class="font-bold text-[#009A22]">{{ infoCard.newPrice }}</p>
          <p class="font-light line-through">{{ infoCard.oldPrice }}</p>
        </div>
      </div>
      <p>{{ infoCard.detail }}</p>
    </div>
  </div>

  <div class="flex flex-col gap-10 px-5 py-16">
    <h1 class="max-w-fit text-[34px] border-b-2 pb-3 border-[#694C9B]">Viiite, j'en profite</h1>
  </div>

  <div class="flex flex-col px-5 py-16 gap-10 mb-36 bg-[#E3E3E3]">
    <h1 class="max-w-fit text-[34px] border-b-2 pb-3 border-[#694C9B]">Informations</h1>
    <div class="flex flex-col gap-7">
      <div class="flex items-center gap-5">
        <IconPin class="shrink-0" />
        <div class="flex flex-col">
          <p class="font-bold">{{ infoCard.adresse }},</p>
          <p class="font-bold">{{ infoCard.ville }}</p>
        </div>
      </div>
      <div class="flex gap-5">
        <IconClock class="shrink-0" />
        <div class="flex flex-col gap-5 w-[100%]">
          <p class="font-bold underline">Horaires</p>
          <ul>
            <li class="flex justify-between">
              <p>lundi</p>
              <p>{{ infoCard.lundi }}</p>
            </li>
            <li class="flex justify-between">
              <p>lundi</p>
              <p>{{ infoCard.mardi }}</p>
            </li>
            <li class="flex justify-between">
              <p>lundi</p>
              <p>{{ infoCard.mercredi }}</p>
            </li>
            <li class="flex justify-between">
              <p>lundi</p>
              <p>{{ infoCard.jeudi }}</p>
            </li>
            <li class="flex justify-between">
              <p>lundi</p>
              <p>{{ infoCard.vendredi }}</p>
            </li>
            <li class="flex justify-between">
              <p>lundi</p>
              <p>{{ infoCard.samedi }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center gap-5">
        <IconHeart class="shrink-0" />
        <p class="font-bold">
          {{ likedCardsCount }} personnes ont aimé cet avantage, vas-y fonce et donne-nous en des
          nouvelles !
        </p>
      </div>
    </div>
  </div>
</template>
