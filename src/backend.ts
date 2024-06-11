import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase

// Copier ici les fonctions developpées en R214 | Système d'information

// FILTRES

export async function getFullList() {
  try {
    const records = await pb.collection('Card').getFullList()
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getOne() {
  try {
    const records = await pb.collection('Card').getOne('3wum4eu9i4t06q8')
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListSorted() {
  try {
    const records = await pb.collection('Card').getFullList({ sort: 'created' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListSortedDesc() {
  try {
    const records = await pb.collection('Card').getFullList({ sort: '-created' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListFilteredFavori() {
  try {
    const records = await pb.collection('Card').getFullList({ filter: 'favori=true' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListFilteredSurfaceAndSortedPrix() {
  try {
    const records = await pb
      .collection('Card')
      .getFullList({ filter: 'surface>=100', sort: 'prix' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListSortedNomCard() {
  try {
    const records = await pb.collection('Card').getFullList({ sort: 'nom' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListFilteredNomCard() {
  try {
    const records = await pb.collection('Card').getFullList({ filter: 'nom="Chamas Tacos"' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListFilteredCertified() {
  try {
    const records = await pb.collection('card').getFullList({ filter: 'certified=true' })
    console.table(records)
    return records
  } catch (e) {
    console.error(e)
  }
}

export async function getFullListFilteredNotNomCardAndSorted() {
  try {
    const records = await pb
      .collection('Card')
      .getFullList({ filter: 'nomCard!="lounge"', sort: 'nomCard' })
    console.table(records)
  } catch (e) {
    console.error(e)
  }
}


// export async function oneID(id) {
//   const record = await pb.collection('Card').getOne(id)
//   return record
// }


export async function allCardsSorted() {
  const records = await pb.collection('Card').getFullList({
    sort: 'prix'
  })
  return records
}

export async function addNewEvent() {
  await pb.collection('event').create
}
