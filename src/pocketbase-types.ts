/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
  Card = 'Card',
  Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  created: IsoDateString
  updated: IsoDateString
  collectionId: string
  collectionName: Collections
  expand?: T
}

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CardRecord = {
  adresse?: string
  certified?: boolean
  date?: IsoDateString
  description?: string
  detail?: string
  dimanche?: string
  image?: string
  jeudi?: string
  lundi?: string
  mardi?: string
  mercredi?: string
  newPrice?: string
  nom?: string
  oldPrice?: string
  samedi?: string
  type?: string
  vendredi?: string
  ville?: string
}

export type UsersRecord = {
  avatar?: string
  favoris?: RecordIdString[]
  name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CardResponse<Texpand = { [key: string]: any } | undefined> = Required<CardRecord> &
  BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  Card: CardRecord
  users: UsersRecord
}

export type CollectionResponses = {
  Card: CardResponse
  users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: 'Card'): RecordService<CardResponse>
  collection(idOrName: 'users'): RecordService<UsersResponse>
}
