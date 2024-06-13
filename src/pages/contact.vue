<script setup lang="ts">
import Button from '@/components/Button.vue'
import { ref, onMounted } from 'vue'

import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
const router = useRouter()

const currentuser = ref()

onMounted(async () => {
  currentuser.value = pb.authStore.isValid ? pb.authStore.model : null

  if (!currentuser.value) {
    router.replace('/connexion')
  }
})

const formData = ref({
  lname: '',
  fname: '',
  email: '',
  subject: '',
  message: ''
});

const fields = [
  { name: 'lname', type: 'text', label: 'Nom' },
  { name: 'fname', type: 'text', label: 'Prénom' },
  { name: 'email', type: 'email', label: 'Adresse mail' },
  { name: 'subject', type: 'text', label: 'Sujet' },
  { name: 'message', type: 'textarea', label: 'Dites nous...' }
];
</script>

<template>
  <section class="py-24 px-8 lg:px-32 m-10">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[1vw]">
        <div class="flex flex-col gap-14">
            <div class="relative flex justify-between items-center w-full">
          <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">
            Contact
          </h1>
        </div>
          <p class="mb-10">
            Un problème ? une question ? <br />
            L'équipe de Stud+ est là pour vous aider. <br />
          </p>
        </div>
        <form action="/submit_contact" method="post" class="space-y-6">
          <div v-for="(field, index) in fields" :key="index" class="relative">
            <input
              v-model="formData[field.name]"
              :type="field.type"
              :id="field.name"
              :name="field.name"
              class="mt-1 block w-full p-2 border-b border-black bg-transparent focus:outline-none placeholder-transparent"
              placeholder=" "
              required
            />
            <label
              :for="field.name"
              class="absolute top-0 left-0 text-base font-light lg:text-xl transition-all"
              :class="{'-top-6 text-sm': formData[field.name]}"
            >
              {{ field.label }}
            </label>
          </div>
          <div class="flex justify-center items-center">
            <Button class="mb-8 lg:mb-6" url="/contact" text="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
input:focus + label,
input:not(:placeholder-shown) + label,
textarea:focus + label,
textarea:not(:placeholder-shown) + label {
  transform: translateY(-1.5rem);
  font-size: 0.85rem;
  color: #694C9B;
}

label {
  position: absolute;
  top: 0.5rem;
  left: 0.75rem;
  pointer-events: none;
  transition: all 0.2s ease-out;
}
</style>
