<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInsta from '@/components/icons/IconInsta.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconMMI from '@/components/icons/IconMMI.vue'
</script>

<template>
  <footer class="flex flex-col w-full overflow-hidden pb-20 bg-[#E3E3E3]">
    <div class="flex justify-between items-center py-24 relative px-8 md:px-52">
      <iconLogo />
      <IconMMI class="w-[70px] lg:w-[6vw] h-auto" />
    </div>
    <nav class="flex flex-wrap gap-11 w-full justify-between items-start px-8 md:px-52">
      <p class="text-4xl font-bold">#SAVESTUDENTS</p>
      <div class="flex flex-col justify-between gap-10 relative w-full md:w-auto">
        <p class="w-full text-xl font-medium uppercase border-b-2 border-[#694C9B]">
          Besoin d'aide ?
        </p>
        <ul class="flex gap-4 flex-col justify-between relative">
          <li>
            <RouterLink class="block" to="/contact">Contactez nous</RouterLink>
          </li>
          <li>
            <RouterLink class="block" to="/about">Partenaires</RouterLink>
          </li>
          <li>
            <RouterLink class="block" to="/about">À propos</RouterLink>
          </li>
          <li>
            <RouterLink class="block" to="/account">Mon compte</RouterLink>
          </li>
        </ul>
      </div>
      <div class="flex flex-col justify-between gap-10 relative w-full md:w-auto">
        <p class="w-full text-xl font-medium uppercase border-b-2 border-[#694C9B]">Légal</p>
        <ul class="flex gap-4 flex-col justify-between relative">
          <li>
            <RouterLink class="block" to="/LegalNotice">Mentions légales</RouterLink>
          </li>
          <li>
            <RouterLink class="block" to="/TermsOfUse">Conditions d'utilisation</RouterLink>
          </li>
          <li>
            <RouterLink class="block" to="/PrivacyPolicy">Politique de confidentialité</RouterLink>
          </li>
        </ul>
      </div>
      <div class="flex flex-col justify-between gap-10 relative w-full md:w-auto">
        <p class="w-full text-xl font-medium uppercase border-b-2 border-[#694C9B]">réseaux</p>
        <div class="flex flex-col justify-between gap-6 w-60 relative">
          <p class="block">Suivez nous pour suivre notre actualité, nos promos et bien plus !</p>
          <div class="flex justify-between w-full relative">
            <router-link to="/">
              <IconFacebook />
            </router-link>
            <router-link to="/">
              <IconInsta />
            </router-link>
            <router-link to="/">
              <IconTwitter />
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </footer>
</template>
