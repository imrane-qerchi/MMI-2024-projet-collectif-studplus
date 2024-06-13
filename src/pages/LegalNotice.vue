<script setup lang="ts">
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'
import { ref, onMounted } from 'vue'
const router = useRouter()

const currentuser = ref()

onMounted(async () => {
  currentuser.value = pb.authStore.isValid ? pb.authStore.model : null

  if (!currentuser.value) {
    router.replace('/connexion')
  }
})
</script>

<template>
  <section class="m-10">
    <div class="relative flex justify-between items-center w-full">
      <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Mentions légales</h1>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 1 - L'éditeur</h2>
      <div>
        <p class="">
          L'édition du Site est assurée par Stud+ SARL au capital de 6000 euros, immatriculée au
          Registre du Commerce et des Sociétés de Montbéliard sous le numéro XXXXXXXXX dont le siège
          social est situé au 2 Rue Apagnan, 25200 Montbéliard, Numéro de téléphone : XXXXXXXXXX
          Adresse e-mail : studplus@gmail.com N° de TVA intracommunautaire : XXXXXXXXXX Le Directeur
          de la publication est Tony MORETTI ci-après l'"Editeur".
        </p>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 2 - L'hébergeur</h2>
      <div>
        <p class="pb-5">
          L'hébergeur du Site est la société Infomaniak, dont le siège social est situé à Genève.
        </p>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 3 - Accès au site</h2>
      <div>
        <p class="pb-5">
          Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure,
          interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
        </p>
        <p>
          En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu
          responsable.
        </p>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 4 - Collecte des données</h2>
      <div>
        <p class="pb-5">
          Le Site assure à l'Utilisateur une collecte et un traitement d'informations personnelles
          dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative
          à l'informatique, aux fichiers et aux libertés.
        </p>
        <p class="pb-5">
          En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur
          dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses
          données personnelles. L'Utilisateur exerce ce droit :
        </p>
        <ul class="pb-5 list-disc">
          <li>par mail à l'adresse email contact@studplus.com</li>
          <li>via un formulaire de contact ;</li>
          <li>via son espace personnel.</li>
        </ul>
        <p class="pb-5">
          Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou
          partie du Site, sans autorisation de l’Editeur est prohibée et pourra entraînée des
          actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété
          intellectuelle et le Code civil.
        </p>
      </div>
    </div>
  </section>
</template>
