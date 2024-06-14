<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import { RouterLink } from 'vue-router'
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import { ref } from 'vue'

const activeMenu = ref(false)

const router = useRouter()

const doLogout = () => {
  pb.authStore.clear()
  router.push('/connexion')
}

function closeMenu() {
  activeMenu.value = false
}
</script>

<template>
  <header
    class="flex items-center justify-between px-10 py-12 gap-8 border-b-2 border-b-indigo-100 h-24"
  >
    <RouterLink to="/" @click="closeMenu">
      <IconLogo />
    </RouterLink>
    <button
      class="relative z-10 flex h-3 w-6 flex-col justify-between lg:hidden *:block *:ease *:h-[2px] *:w-full *:transform *:rounded-full *:bg-black *:transition *:duration-300"
      @click="activeMenu = !activeMenu"
    >
      <span :class="{ 'translate-y-[5px] rotate-45': activeMenu }"></span>
      <span :class="{ '-translate-y-[5px] -rotate-45': activeMenu }"></span>
    </button>
    <nav
      class="invisible opacity-0 flex-1 px-6 py-12 flex justify-between mt-24 flex-col fixed z-50 inset-0 bg-indigo-50 lg:mt-0 lg:flex-row lg:static lg:bg-transparent lg:py-6 lg:visible lg:opacity-100"
      :class="{ '!visible !opacity-100': activeMenu }"
      v-scroll-lock="activeMenu"
    >
      <ul class="lg:ml-auto flex flex-col gap-4 lg:flex-row">
        <li>
          <RouterLink class="block p-4 rounded-lg text-gray-500" to="/nearOffers" @click="closeMenu"
            >Autour De Moi</RouterLink
          >
        </li>
        <li>
          <RouterLink class="block p-4 rounded-lg text-gray-500" to="/contact" @click="closeMenu"
            >Contact</RouterLink
          >
        </li>
        <li>
          <RouterLink class="block p-4 rounded-lg text-gray-500" to="/favoris" @click="closeMenu"
            >Mes Favoris</RouterLink
          >
        </li>
        <li>
          <RouterLink class="block p-4 rounded-lg text-gray-500" to="/about" @click="closeMenu"
            >À Propos</RouterLink
          >
        </li>
        <li>
          <RouterLink class="block p-4 rounded-lg text-gray-500" to="/profile" @click="closeMenu"
            >Mon Compte</RouterLink
          >
        </li>
      </ul>
      <div class="flex flex-col items-center justify-center gap-4 px-4">
        <button
          type="button"
          @click="doLogout"
          class="flex w-full justify-center rounded-md bg-[#694C9B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  </header>
</template>
