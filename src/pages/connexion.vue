<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import Pocketbase from 'pocketbase'
import { pb } from '@/backend'
import AlertWindow from '@/components/AlertWindow.vue'
import IconLogo from '@/components/icons/IconLogo.vue'

const router = useRouter()

const email = ref('')
const password = ref('')

const login_error = ref(false)
const login_message = ref({
  variant: '',
  title_text: '',
  message_text: ''
})

onMounted(async () => {
  if (pb.authStore.isValid) {
    router.replace('/')
  }
})

const doLogin = async () => {
  try {
    await pb.collection('users').authWithPassword(email.value, password.value)
    window.location.reload()
  } catch (error) {
    checkError(error)
  }
}

function checkError(error: any) {
   if (error.response && error.response.code === 404) {
    login_error.value = true
    login_message.value = {
      variant: 'bad',
      title_text: 'Utilisateur introuvable',
      message_text: "Ce compte n'existe pas."
    }
    setTimeout(() => {
      login_error.value = false
    }, 5000)
  } else if (error.reponse && error.response.code === 400) {
    login_error.value = true
    login_message.value = {
      variant: 'bad',
      title_text: 'Erreur',
      message_text: 'Une erreur est survenue. Veuillez réessayer.'
    }
    setTimeout(() => {
      login_error.value = false
    }, 5000)
  } else {
    login_error.value = true
    login_message.value = {
      variant: 'bad',
      title_text: 'Erreur',
      message_text: 'Une erreur est survenue. Veuillez réessayer.'
    }
    setTimeout(() => {
      login_error.value = false
    }, 5000)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="flex flex-col items-center justify-center">
        <IconLogo class="w-40 h-auto"/>
        <h2 class="mt-6 w-[75%] text-center text-3xl font-extrabold text-gray-900">
          Bon retour parmi nous !
        </h2>
        <p class="text-center pt-5">Connectez vous à votre compte.</p>
      </div>
      <form class="mt-8 space-y-6 drop-shadow-lg" @submit.prevent="doLogin">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <p>Adresse e-mail</p>
            <label for="email-address" class="sr-only">Adresse e-mail</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-3 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Adresse e-mail"
            />
          </div>
          <div>
            <p>Mot de passe</p>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-3 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full drop-shadow-lg flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#694C9B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Se connecter
          </button>
          <p class="pt-5">Vous n'avez pas de compte ? <button class="underline font-bold" @click="router.push('/inscription')">Inscription</button></p>
        </div>
      </form>
    </div>
  </div>
  <AlertWindow class="ease-in-out duration-75Z" v-show="login_error" v-bind="login_message" />
</template>
