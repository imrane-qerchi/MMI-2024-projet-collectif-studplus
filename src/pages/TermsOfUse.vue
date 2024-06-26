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
      <h1 class="text-[34px] border-b-2 pb-3 border-[#694C9B]">Conditions d'utilisation</h1>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 1 - Objet</h2>
      <div>
        <p class="pb-5">
          Les présentes CGU ou Conditions Générales d’Utilisation encadrent juridiquement
          l’utilisation des services du site Stud+.
        </p>
        <p>
          Constituant le contrat entre la société Stud+, l’Utilisateur, l’accès au site doit être
          précédé de l’acceptation de ces CGU. L’accès à cette plateforme signifie l’acceptation des
          présentes CGU.
        </p>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 2 - Mentions légales</h2>
      <div>
        <p class="pb-5">
          L’édition du site Stud+ est assurée par la société Stud+ inscrite au RCS sous le numéro
          XXX XXX XXX, dont le siège social est localisé au X Rue Apagnan, 25200 Montbéliard .
        </p>
        <p class="pb-5">L’hébergeur du site est la société Infomaniak, située à Genève, Suisse.</p>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 3 - Accès au site</h2>
      <div>
        <p class="pb-5">
          Le site est accessible gratuitement depuis n’importe où par tout utilisateur disposant
          d’un accès à Internet. Tous les frais nécessaires pour l’accès aux services (matériel
          informatique, connexion Internet…) sont à la charge de l’utilisateur.
        </p>
        <p class="pb-5">
          L’accès aux services dédiés aux membres s’effectue à l’aide d’un identifiant et d’un mot
          de passe.
        </p>
        <p>
          Pour des raisons de maintenance ou autres, l’accès au site peut être interrompu ou
          suspendu par l’éditeur sans préavis ni justification.
        </p>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 4 - Collecte des données</h2>
      <div>
        <p class="pb-5">
          Pour la création du compte de l’Utilisateur, la collecte des informations au moment de
          l’inscription sur le site est nécessaire et obligatoire. Conformément à la loi n°78-17 du
          6 janvier relative à l’informatique, aux fichiers et aux libertés, la collecte et le
          traitement d’informations personnelles s’effectuent dans le respect de la vie privée.
        </p>
        <p class="pb-5">
          Suivant la loi Informatique et Libertés en date du 6 janvier 1978, articles 39 et 40,
          l’Utilisateur dispose du droit d’accéder, de rectifier, de supprimer et d’opposer ses
          données personnelles. L’exercice de ce droit s’effectue par :
        </p>
        <ul class="pb-5 list-disc">
          <li>Le formulaire de contact ;</li>
          <li>Son espace client.</li>
        </ul>
      </div>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 5 - Propriété intellectuelle</h2>
      <p class="pb-5">
        Les marques, logos ainsi que les contenus du site Stud+ (illustrations graphiques, textes…)
        sont protégés par le Code de la propriété intellectuelle et par le droit d’auteur.
      </p>
      <p class="pb-5">
        La reproduction et la copie des contenus par l’Utilisateur requièrent une autorisation
        préalable du site. Dans ce cas, toute utilisation à des usages commerciaux ou à des fins
        publicitaires est proscrite.
      </p>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 6 - Responsabilité</h2>
      <p class="pb-5">
        Bien que les informations publiées sur le site soient réputées fiables, le site se réserve
        la faculté d’une non-garantie de la fiabilité des sources.
      </p>
      <p class="pb-5">
        Les informations diffusées sur le site Stud+ sont présentées à titre purement informatif et
        sont sans valeur contractuelle. En dépit des mises à jour régulières, la responsabilité du
        site ne peut être engagée en cas de modification des dispositions administratives et
        juridiques apparaissant après la publication. Il en est de même pour l’utilisation et
        l’interprétation des informations communiquées sur la plateforme.
      </p>
      <p class="pb-5">
        Le site décline toute responsabilité concernant les éventuels virus pouvant infecter le
        matériel informatique de l’Utilisateur après l’utilisation ou l’accès à ce site.
      </p>
      <p class="pb-5">
        Le site ne peut être tenu pour responsable en cas de force majeure ou du fait imprévisible
        et insurmontable d’un tiers.
      </p>
      <p class="pb-5">
        La garantie totale de la sécurité et la confidentialité des données n’est pas assurée par le
        site. Cependant, le site s’engage à mettre en œuvre toutes les méthodes requises pour le
        faire au mieux.
      </p>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 7 - Liens hypertextes</h2>
      <p class="pb-5">
        Le site peut être constitué de liens hypertextes. En cliquant sur ces derniers,
        l’Utilisateur sortira de la plateforme. Cette dernière n’a pas de contrôle et ne peut pas
        être tenue responsable du contenu des pages web relatives à ces liens.
      </p>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 8 - Cookies</h2>
      <p class="pb-5">
        Lors des visites sur le site, l’installation automatique d’un cookie sur le logiciel de
        navigation de l’Utilisateur peut survenir.
      </p>
      <p class="pb-5">
        Les cookies correspondent à de petits fichiers déposés temporairement sur le disque dur de
        l’ordinateur de l’Utilisateur. Ces cookies sont nécessaires pour assurer l’accessibilité et
        la navigation sur le site. Ces fichiers ne comportent pas d’informations personnelles et ne
        peuvent pas être utilisés pour l’identification d’une personne.
      </p>
      <p class="pb-5">
        L’information présente dans les cookies est utilisée pour améliorer les performances de
        navigation sur le site Stud+.
      </p>
      <p class="pb-5">
        En naviguant sur le site, l’Utilisateur accepte les cookies. Leur désactivation peut
        s’effectuer via les paramètres du logiciel de navigation.
      </p>
    </div>
    <div class="m-5">
      <h2 class="mb-5 mt-10">Article 9 - Droit applicable et juridiction compétente</h2>
      <p class="pb-5">
        Le présent contrat est soumis à la législation française. L’absence de résolution à
        l’amiable des cas de litige entre les parties implique le recours aux tribunaux français
        compétents pour régler le contentieux.
      </p>
    </div>
  </section>
</template>
