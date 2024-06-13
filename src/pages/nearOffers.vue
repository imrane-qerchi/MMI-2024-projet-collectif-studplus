<template>
  <div class="flex flex-col gap-10 px-5 py-16">
    <h1 class="max-w-fit text-[34px] border-b-2 pb-3 border-[#694C9B]">Offres proches de vous</h1>
    <form @submit.prevent="updateUserLocation">
      <div class="flex flex-col gap-3 mb-5">
        <label class="font-bold" for="adresse">Adresse</label>
        <p class="text-gray-600 font-light text-sm"> n° | adresse | code postal | ville</p>
        <input 
          type="text" 
          id="adresse" 
          v-model="userAddress" 
          ref="autocompleteInput" 
          class="p-2 border border-gray-300 rounded"
          @focus="initAutocomplete"
        />
        <button type="submit" class="px-4 py-2 mt-2 text-white bg-purple-600 rounded">Mettre à jour la position</button>
      </div>
    </form>
    <GoogleMap :api-key="API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="12">
      <Marker
        v-for="(enseigne, index) in enseignes"
        :key="index"
        :options="{ position: enseigne.location, title: enseigne.nom }"
      />
      <Marker
        :options="{ position: userLocation, icon: userIconUrl, title: 'Votre Position' }"
        @click="showUserLocationInfo"
      />
      <InfoWindow :position="userLocation" :opened="infoWindowOpened">
        <div>Votre Position</div>
      </InfoWindow>
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import { Loader } from '@googlemaps/js-api-loader'
import { pb } from '@/backend'
import type { CardResponse } from '@/pocketbase-types'

// Importer l'icône utilisateur
import userIcon from '@/components/icons/user.svg'

const API_KEY = 'AIzaSyCKmO2ekMm4OlsHvib9gUlBAs9sEZSCv8Q'
const center = ref({ lat: 47.5098, lng: 6.7997 })
const enseignes = ref([])
const userLocation = ref({ lat: 47.5098, lng: 6.7997 })
const infoWindowOpened = ref(false)
const userIconUrl = userIcon;
const userAddress = ref('')
const autocompleteInput = ref(null)

const loadMap = async () => {
  const loader = new Loader({
    apiKey: API_KEY,
    version: 'weekly',
    libraries: ['places']
  })

  await loader.load()
  const google = window.google
  const geocoder = new google.maps.Geocoder()

  const records = await pb.collection('Card').getFullList()
  enseignes.value = await Promise.all(
    records.map(async (infoCard: CardResponse<any>) => {
      const { ville, adresse, nom } = infoCard
      const location = await geocodeAddress(geocoder, `${adresse}, ${ville}`)
      console.log('Enseigne location:', location); 
      return { nom, location }
    })
  )
}

const geocodeAddress = (geocoder, address) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        resolve(results[0].geometry.location)
      } else {
        reject(new Error(`Geocode failed: ${status}`))
      }
    })
  })
}

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log('User location:', pos);
        userLocation.value = pos
        center.value = pos
      },
      (error) => {
        console.error('Error getting user location', error)
      }
    )
  } else {
    console.error('Browser does not support Geolocation')
  }
}

const updateUserLocation = async () => {
  const google = window.google
  const geocoder = new google.maps.Geocoder()
  const address = userAddress.value

  try {
    const location = await geocodeAddress(geocoder, address)
    userLocation.value = location
    center.value = location
  } catch (error) {
    console.error('Error updating user location:', error)
  }
}

const initAutocomplete = () => {
  const google = window.google
  const input = autocompleteInput.value
  const autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] })

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place.geometry) {
      userLocation.value = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      center.value = userLocation.value
      userAddress.value = place.formatted_address
    }
  })
}

const showUserLocationInfo = () => {
  console.log('showUserLocationInfo called');
  infoWindowOpened.value = true
  console.log('infoWindowOpened:', infoWindowOpened.value);
}

onMounted(async () => {
  await loadMap()
  getUserLocation()
})
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
