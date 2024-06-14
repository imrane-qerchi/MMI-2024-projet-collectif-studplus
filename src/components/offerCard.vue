<script setup lang="ts">
import { type CardResponse } from '@/pocketbase-types'

import ImgPb from './ImgPb.vue'
import { pb } from '@/backend'

const props = defineProps<CardResponse<any>>()

function fixeFavoriPourID(fav: boolean, id: string) {
  console.log(fav, id)
  pb.collection('Card').update(id, { fav: fav })
  location.reload()
}
</script>

<template>
  <router-link :to="`/offres/${id}`">
    <div class="flex flex-col justify-between items-start w-full h-full z-10">
      <div class="flex flex-col justify-between items-start self-stretch flex-grow relative">
        <ImgPb
          :record="props"
          :filename="image"
          class="h-[200px] w-full self-stretch flex-grow rounded-tl-[15px] rounded-tr-[15px] object-cover border-4 bg-white border-white"
        /><svg
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
            d="M21.6 12.84C21.4315 12.5751 21.2908 12.2936 21.18 12C21.0834 11.6982 21.023 11.386 21 11.07C20.9869 10.3052 20.7656 9.55845 20.36 8.90996C19.864 8.32191 19.2177 7.87952 18.49 7.62996C18.193 7.51535 17.9083 7.3713 17.64 7.19996C17.4073 6.99964 17.1931 6.77874 17 6.53996C16.5406 5.91622 15.9176 5.4317 15.2 5.13996C14.4734 4.96826 13.7142 4.99242 13 5.20996C12.362 5.35989 11.698 5.35989 11.06 5.20996C10.3333 4.98516 9.55933 4.96098 8.82 5.13996C8.09507 5.42851 7.46485 5.9133 7 6.53996C6.8006 6.77963 6.57968 7.00055 6.34 7.19996C6.07173 7.3713 5.78698 7.51535 5.49 7.62996C4.75869 7.87791 4.10875 8.32042 3.61 8.90996C3.21495 9.56149 3.00413 10.308 3 11.07C2.97705 11.386 2.91663 11.6982 2.82 12C2.70798 12.2867 2.56727 12.5615 2.4 12.82C1.94913 13.4627 1.68284 14.2166 1.63 15C1.68642 15.7764 1.95255 16.5229 2.4 17.16C2.57112 17.4162 2.71206 17.6914 2.82 17.98C2.90701 18.2897 2.95736 18.6085 2.97 18.93C2.98215 19.6949 3.20348 20.4419 3.61 21.09C4.106 21.678 4.75231 22.1204 5.48 22.37C5.77698 22.4846 6.06173 22.6286 6.33 22.8C6.56968 22.9994 6.7906 23.2203 6.99 23.46C7.44634 24.0867 8.07024 24.5719 8.79 24.86C9.07204 24.9458 9.36519 24.9896 9.66 24.99C10.1116 24.9756 10.5606 24.9153 11 24.81C11.6369 24.6508 12.3031 24.6508 12.94 24.81C13.6685 25.0262 14.441 25.0469 15.18 24.87C15.8998 24.5819 16.5237 24.0967 16.98 23.47C17.1794 23.2303 17.4003 23.0094 17.64 22.81C17.9083 22.6386 18.193 22.4946 18.49 22.38C19.2177 22.1304 19.864 21.688 20.36 21.1C20.7665 20.4519 20.9879 19.7049 21 18.94C21.0127 18.6185 21.063 18.2997 21.15 17.99C21.262 17.7032 21.4027 17.4284 21.57 17.17C22.0298 16.5333 22.3065 15.7828 22.37 15C22.3136 14.2235 22.0475 13.477 21.6 12.84Z"
            fill="#694C9B"
            stroke="white"
            stroke-width="2"
          ></path>
          <path
            d="M11 19.0002C10.8684 19.0009 10.7379 18.9757 10.6161 18.926C10.4943 18.8762 10.3834 18.8029 10.29 18.7102L7.29 15.7102C7.19676 15.6169 7.1228 15.5063 7.07234 15.3844C7.02188 15.2626 6.99591 15.132 6.99591 15.0002C6.99591 14.7339 7.1017 14.4785 7.29 14.2902C7.47831 14.1019 7.7337 13.9961 8 13.9961C8.2663 13.9961 8.5217 14.1019 8.71 14.2902L11 16.5902L15.29 12.2902C15.4783 12.1019 15.7337 11.9961 16 11.9961C16.2663 11.9961 16.5217 12.1019 16.71 12.2902C16.8983 12.4785 17.0041 12.7339 17.0041 13.0002C17.0041 13.2665 16.8983 13.5219 16.71 13.7102L11.71 18.7102C11.6166 18.8029 11.5057 18.8762 11.3839 18.926C11.2621 18.9757 11.1316 19.0009 11 19.0002Z"
            fill="white"
            stroke="white"
            stroke-width="2"
          ></path>
        </svg>
      </div>
      <div
        class="relative flex flex-col p-7 justify-start items-start self-stretch flex-grow-0 flex-shrink-0 rounded-bl-lg rounded-br-lg bg-white"
      >
        <div class="flex items-start self-stretch flex-grow-0 flex-shrink-0">
          <div class="max-w-full flex flex-col gap-3 items-start flex-grow-0 flex-shrink-0 h-full">
            <div class="flex flex-col items-start flex-grow-0 flex-shrink-0">
              <p class="self-stretch text-[22px] font-semibold text-left text-black">
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
            @click="fixeFavoriPourID(!fav, id)"
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
              d="M30.6308 17.8587C31.4956 18.7269 31.9811 19.9025 31.9811 21.128C31.9811 22.3534 31.4956 23.529 30.6308 24.3973L23.4883 31.5963L16.3459 24.3973C15.7036 23.7506 15.2663 22.9289 15.0887 22.0349C14.9112 21.1409 15.0013 20.2144 15.3478 19.3714C15.6942 18.5284 16.2817 17.8063 17.0366 17.2956C17.7914 16.7848 18.6802 16.5081 19.5916 16.5C20.8103 16.5074 21.9768 16.9957 22.8373 17.8587C23.0883 18.107 23.307 18.386 23.4883 18.689C23.6696 18.386 23.8884 18.107 24.1393 17.8587C24.5633 17.4285 25.0686 17.0869 25.6258 16.8537C26.183 16.6205 26.781 16.5004 27.385 16.5004C27.9891 16.5004 28.5871 16.6205 29.1443 16.8537C29.7015 17.0869 30.2068 17.4285 30.6308 17.8587Z"
              :fill="fav ? '#694C9B' : 'transparent'"
              stroke="#694C9B"
              stroke-width="1.41509"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </router-link>
</template>
