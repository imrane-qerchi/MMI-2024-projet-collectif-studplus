<script setup lang="ts">
import Button from '@/components/Button.vue';
import { RouterLink } from 'vue-router';
import IconCertif from '@/components/icons/IconCertif.vue'
</script>
  

<template>
    <section class="pt-10">
        <div class="m-5">
            <div class="relative flex justify-between items-center w-full">
                <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">À propos</h1>
            </div>
            <p class="pt-5">Stud+ est une entreprise crée par des étudiants pour des étudiants !</p>
        </div>
        <div class="m-5">
            <h2 class="pt-10">Notre histoire</h2>
            <p class="pt-5">
                Stud+ a été créé par des étudiants passionnés par l'innovation. Face aux défis financiers et à la recherche d'avantages étudiants, nous avons lancé Stud+ pour simplifier la vie universitaire. De nos débuts modestes à notre expansion actuelle, notre engagement envers l'innovation reste constant.
            </p>
        </div>
        <div class="py-12 px-1 lg:px-32">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-[4vw] items-center">
                    <div class="flex flex-col gap-8">
                        <div class="">
                            <h2 class="">Notre Mission</h2>
                        </div>
                        <p>
                            Notre mission est de simplifier la vie étudiante en offrant un accès facile à des avantages exclusifs. Nous croyons que chaque étudiant devrait profiter pleinement de son expérience universitaire sans souci financier. Avec la carte étudiante comme alliée, Stud+ s'engage à faciliter la découverte et l'utilisation des avantages offerts par nos partenaires locaux. Nous sommes déterminés à soutenir les étudiants en leur offrant les outils nécessaires pour réussir et s'épanouir. Rejoignez-nous pour rendre la vie étudiante plus enrichissante et abordable.
                        </p>
                        <div class="flex justify-center">
                        </div>
                    </div>
                    <img src="/src/img/carteetudiante.png" alt="" class="w-full h-auto object-cover"/>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center pt-[10vh]">
            <img src="/src/img/3d-casual-life-happy-thankful-man.png" alt="">
            <p class="text-[30px] font-semibold pt-5">1000+</p>
            <p class="text-[30px] font-semibold">Utilisateurs</p>
        </div>
    </section>
    <section class="relative overflow-x-hidden container pt-36">
        <div class="">
            <h2 class="text-[34px] border-b-2 pb-3 w-fit border-[#694C9B]">Partenaires</h2>
            <IconCertif class="w-[300px] h-auto top-[5vw] right-[-35vw]" />
        </div>
        
        <p class="py-5 font-semibold">
            Nous travaillons en étroite collaboration avec différentes enseignes afin de vous obtenir d’incroyables avantages !
        </p>
        <RouterLink to="/nearOffers" class="text-gray-400 underline text-[14px]" >DÉCOUVRIR LES AVANTAGES</RouterLink>
        <Button url="/Contact" text="Devenir partenaire" class="my-[7vh]" />
    </section>
</template>