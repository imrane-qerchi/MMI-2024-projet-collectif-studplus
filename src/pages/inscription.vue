<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Bienvenue sur Stud+
        </h2>
        <p class="text-center pt-5">
          Inscris toi ou connecte toi pour trouver des avantages
        </p>
      </div>
      <form class="mt-8 space-y-6 drop-shadow-lg" @submit.prevent="doRegister">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <p>Nom</p>
            <label class="sr-only" for="">Nom</label>
            <input
              v-model="user_form.name"
              class="appearance-none rounded-lg relative block w-full px-3 py-3 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              placeholder="Nom"
              required
            />
          </div>
          <div>
            <p>Pseudo</p>
            <label class="sr-only" for="">Pseudo</label>
            <input
              v-model="user_form.username"
              class="appearance-none rounded-lg relative block w-full px-3 py-3 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="text"
              placeholder="Pseudo"
              required
            />
          </div>
          <div>
            <p>Adresse e-mail</p>
            <label class="sr-only" for="">Adresse e-mail</label>
            <input
              v-model="user_form.email"
              class="appearance-none rounded-lg relative block w-full px-3 py-3 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="email"
              placeholder="Adresse e-mail"
              required
            />
          </div>
          <div>
            <p>Mot de passe</p>
            <label class="sr-only" for="">Mot de passe</label>
            <input
              v-model="user_form.password"
              class="appearance-none rounded-t-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              placeholder="Mot de passe"
              minlength="8"
              required
            />
          </div>
          <div>
            <label class="sr-only" for="">Confirmer le mot de passe</label>
            <input
              v-model="user_form.passwordConfirm"
              class="appearance-none rounded-b-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              type="password"
              minlength="8"
              placeholder="Confirmer le mot de passe"
              required
            />
            <p class="mt-3">Votre mot de passe doit contenir au moins :</p>
            <ul class="list-disc list-inside">
              <li>8 caractères minimum</li>
              <li>1 minuscule</li>
              <li>1 majuscule</li>
              <li>1 caractère spécial</li>
            </ul>
          </div>
        </div>

        <div>
          <button
            @click="register_user"
            type="submit"
            class="group relative w-full drop-shadow-lg mb-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#694C9B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            S'inscrire
          </button>
          <p class="pt-5">
            Vous avez déjà un compte ?
            <button class="underline font-bold" @click="router.push('/connexion')">
              Connexion
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
  <AlertWindow v-show="error_show" variant="bad" v-bind="form_error" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router/auto'
import { pb, createUser } from '@/backend'
import AlertWindow from '@/components/AlertWindow.vue'
import type { UsersResponse } from '@/pocketbase-types'

const router = useRouter()

const user_form = ref({
  emailVisibility: true
} as UsersResponse)
const error_show = ref(false)
const form_error = ref({})

onMounted(async () => {
  if (pb.authStore.isValid) {
    router.replace('/')
  }
})

const register_user = async () => {
  if (user_form.value.password !== user_form.value.passwordConfirm) {
    error_show.value = true
    form_error.value = {
      title_text: 'Erreur',
      message_text: 'Les mots de passe ne correspondent pas.'
    }
    setTimeout(() => {
      error_show.value = false
    }, 5000)
  } else {
    try {
      await createUser(user_form.value)
    } catch (e) {
      error_show.value = true
      form_error.value = {
        title_text: 'Erreur',
        message_text: "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      }
      setTimeout(() => {
        error_show.value = false
      }, 5000)
    }
  }
}
</script>
