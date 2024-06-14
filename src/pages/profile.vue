<script setup lang="ts">
import IconLikeillus from '@/components/icons/IconLikeillus.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { UsersResponse } from '@/pocketbase-types'
import Button from '@/components/Button.vue'

import ImgPb from './ImgPb.vue'

const router = useRouter()
const profile = ref<UsersResponse>({
  name: '',
  username: '',
  email: '',
  emailVisibility: true,
  verified: false,
  avatar: '',
  favoris: [],
  id: '',
  created: '',
  updated: '',
  collectionId: '',
  collectionName: 'users'
})

const userId = pb.authStore.model?.id
const user: UsersResponse<any> = await pb.collection('users').getOne(userId)
const profilPicture = await pb.getFileUrl(user, user.avatar)
const defaultAvatarUrl = 'https://example.com/default-avatar.png'
const avatarUrl = ref(defaultAvatarUrl)
const password = ref('')
const confirmPassword = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  if (!pb.authStore.isValid) {
    router.push('/connexion')
  } else {
    const userId = pb.authStore.model?.id
    const user: UsersResponse<any> = await pb.collection('users').getOne(userId)
    profile.value = user
    let profilPicture = await pb.getFileUrl(user, user.avatar)
    console.log(user.avatar)
    profilPicture = profilPicture ? profilPicture : defaultAvatarUrl
    avatarUrl.value = profilPicture
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const updatedUser = await pb.collection('users').update(profile.value.id, formData)
      const profilPicture = await pb.getFileUrl(updatedUser, updatedUser.avatar)
      avatarUrl.value = profilPicture ? profilPicture : defaultAvatarUrl
      profile.value.avatar = updatedUser.avatar
      alert('Photo de profil mise à jour avec succès')
    } catch (error) {
      alert('Erreur lors de la mise à jour de la photo de profil')
    }
    location.reload()
  } else {
    avatarUrl.value = defaultAvatarUrl
  }
}

const saveProfile = async () => {
  if (password.value && password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  try {
    const updatedProfile: Partial<UsersResponse> = {
      name: profile.value.name,
      username: profile.value.username,
      password: password.value ? password.value : undefined
    }

    await pb.collection('users').update(profile.value.id, updatedProfile)
    alert('Profil mis à jour avec succès')
  } catch (error) {
    alert('Erreur lors de la mise à jour du profil')
  }
}

const logout = () => {
  pb.authStore.clear()
  router.push('/connexion')
}
</script>

<template>
  <section class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="relative flex justify-between items-center w-full">
        <h2 class="mt-6 text-[34px] text-center border-b-2 pb-3 border-[#694C9B]">
          Bonjour {{ profile.username }} !
        </h2>
      </div>
      <div class="flex justify-center">
        <div class="relative">
          <img
            :src="profilPicture"
            class="h-40 w-40 mb-1 rounded-full object-cover border-2 border-gray-300 drop-shadow-lg cursor-pointer"
            @click="triggerFileInput"
          />
          <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
        </div>
      </div>
      <form @submit.prevent="saveProfile">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <p>Nom</p>
            <label class="sr-only" for="name">Nom</label>
            <input
              v-model="profile.name"
              class="appearance-none drop-shadow-lg rounded-lg relative block w-full mb-5 px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="Nom"
              required
            />
          </div>
          <div>
            <p>Username</p>
            <label class="sr-only" for="username">Surnom</label>
            <input
              v-model="profile.username"
              class="appearance-none drop-shadow-lg rounded-lg relative block w-full mb-[7vh] px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="Surnom"
              required
            />
          </div>
          <div>
            <p>Mot de passe</p>
            <label class="sr-only" for="password">Mot de passe</label>
            <input
              v-model="password"
              class="appearance-none drop-shadow-lg rounded-lg relative block w-full mb-5 px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="password"
              placeholder="Nouveau mot de passe (optionnel)"
            />
          </div>
          <div>
            <label class="sr-only" for="confirmPassword">Confirmer le mot de passe</label>
            <input
              v-model="confirmPassword"
              class="appearance-none drop-shadow-lg rounded-lg relative block w-full mb-10 px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="password"
              placeholder="Confirmer le mot de passe (optionnel)"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="py-3 px-4 border border-transparent drop-shadow-lg text-sm font-medium rounded-xl text-white bg-[#694C9B]"
          >
            Enregistrer
          </button>
          <button
            @click="logout"
            type="button"
            class="py-3 px-4 border border-transparent drop-shadow-lg text-sm font-medium rounded-xl text-white bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
      </form>
    </div>
  </section>
  <section class="m-5 mt-24">
    <div class="relative flex justify-between items-center w-full">
      <h2 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Mes avantages</h2>
    </div>
    <div class="mb-28">
      <p class="mt-14 mb-10 font-semibold text-xl">
        Tu kiffes un avantage ? <br />
        n’hésite pas à l’ajouter à ta liste d’avantages fav’ !
      </p>
      <RouterLink to="/favoris" class="text-purple-400 underline text-[14px] font-semibold text-lg"
        >Voir mes avantages favoris
      </RouterLink>
    </div>
  </section>
</template>
