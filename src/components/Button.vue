<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'outlined' | 'filter'
    size?: 'small' | 'medium' | 'large'
    url?: string
    text?: string
    icon?: string | object | undefined | null
  }>(),
  { variant: 'default', size: 'medium' }
)

const variantClass = {
  default: 'rounded-full bg-teal-[##694C9B] text-white',
  outlined: 'rounded-full border-2 border-black bg-transparent text-black',
  filter: 'p-1 rounded-lg bg-[#e3e3e3] shadow-lg focus:outline-none hover:bg-gray-200'
}

const sizeClass = {
  small: 'px-4 py-2.5 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-base'
}
</script>

<template>
  <RouterLink
    class="flex justify-center items-center relative overflow-hidden gap-2.5 text-base font-bold text-center"
    :class="[variantClass[props.variant], sizeClass[props.size]]"
    :to="`${url}`"
  >
    <component
      :is="props.icon"
      
    />
    {{ text }}
  </RouterLink>
</template>

<!-- :class="props.variant === 'outlined' ? 'stroke-teal-700' : 'stroke-white'" -->
