<script setup lang="ts">
import { type CardResponse } from "@/pocketbase-types";
import ImgPb from "./ImgPb.vue";
import { pb } from "@/backend";
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps<CardResponse & {
  isFavori?: boolean;
  userid: string;
}>();

const favori_fill = ref(props.isFavori);

async function addOffer(id: string) {
  try {
    const user = await pb.collection('users').getOne(props.userid);
    const favoris = user.favoris || [];
    if (favoris.includes(id)) {
      await pb.collection('users').update(props.userid, { favoris: favoris.filter(f => f !== id)});
      favori_fill.value = false;
    } else {
      await pb.collection('users').update(props.userid, { favoris: [...favoris, id]});
      favori_fill.value = true;
    }
  } catch (error) {
    console.error("Failed to add offer to favoris:", error);
  }
}


</script>

<template v-if="favorisLoaded">
  <div class="flex flex-col justify-between items-start w-full h-full z-10">
    <router-link class="w-full h-full" :to="`/offres/${id}`">
      <div
        class="flex flex-col justify-between items-start self-stretch flex-grow relative"
      >
        <ImgPb
          :record="props"
          :filename="image"
          class="h-[200px] w-full self-stretch flex-grow rounded-tl-[15px] rounded-tr-[15px] object-cover border-4 bg-white border-white"
        />
        <svg
          v-if="certified"
          width="24"
          height="27"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-6 h-[27px] absolute top-5 right-5"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M21.6 12.84C21.4315 [...]"
            fill="#694C9B"
            stroke="white"
            stroke-width="2"
          ></path>
          <path
            d="M11 19.0002C10.8684 [...]"
            fill="white"
            stroke="white"
            stroke-width="2"
          ></path>
        </svg>
      </div>
    </router-link>
    <div
      class="relative flex flex-col p-7 justify-start items-start self-stretch flex-grow-0 flex-shrink-0 rounded-bl-lg rounded-br-lg bg-white"
    >
      <div class="flex items-start self-stretch flex-grow-0 flex-shrink-0">
        <div
          class="max-w-full flex flex-col gap-3 items-start flex-grow-0 flex-shrink-0 h-full"
        >
          <div class="flex flex-col items-start flex-grow-0 flex-shrink-0">
            <p
              class="self-stretch text-[22px] font-semibold text-left text-black"
            >
              {{ nom }}
            </p>
            <div class="flex flex-row items-center gap-2">
              <p class="text-[15px] font-semibold text-left text-[#858585]">
                {{ type }}
              </p>
              |
              <p class="text-[15px] font-semibold text-left text-[#858585]">
                {{ ville }}
              </p>
            </div>
          </div>
          <p class="text-3xl font-semibold text-left text-[#694c9b]">
            {{ description }}
          </p>
        </div>
        <svg
          @click="addOffer(props.id)"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="cursor-pointer absolute right-7 flex-grow-0 flex-shrink-0 w-[46px] h-[46px]"
          preserveAspectRatio="none"
        >
          <circle
            cx="23"
            cy="23"
            r="22.566"
            stroke="#694C9B"
            stroke-opacity="0.25"
            stroke-width="0.867925"
          ></circle>
          <path
            :fill="props.isFavori || favori_fill ? '#694C9B' : 'transparent'"
            d="M30.6308 17.8587C31.4956 18.7269 31.9811 19.9025 31.9811 21.128C31.9811 22.3534 31.4956 23.529 30.6308 24.3973L23.4883 31.5963L16.3459 24.3973C15.7036 23.7506 15.2663 22.9289 15.0887 22.0349C14.9112 21.1409 15.0013 20.2144 15.3478 19.3714C15.6942 18.5284 16.2817 17.8063 17.0366 17.2956C17.7914 16.7848 18.6802 16.5081 19.5916 16.5C20.8103 16.5074 21.9768 16.9957 22.8373 17.8587C23.0883 18.107 23.307 18.386 23.4883 18.689C23.6696 18.386 23.8884 18.107 24.1393 17.8587C24.5633 17.4285 25.0686 17.0869 25.6258 16.8537C26.183 16.6205 26.781 16.5004 27.385 16.5004C27.9891 16.5004 28.5871 16.6205 29.1443 16.8537C29.7015 17.0869 30.2068 17.4285 30.6308 17.8587Z"
            stroke="#694C9B"
            stroke-width="1.41509"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
