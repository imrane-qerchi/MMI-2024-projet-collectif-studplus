<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant: 'good' | 'bad' | 'warning'
    title_text: string
    message_text: string
  }>(),
  {
    variant: 'good'
  }
)

const variantClass = {
  good: 'bg-green-500',
  bad: 'bg-red-500',
  warning: 'bg-yellow-300'
}
</script>

<template>
  <div class="px-10 py-7 fixed rounded-r-xl bottom-4 left-0" :class="variantClass[props.variant]">
    <section class="inline-flex items-center gap-1">
      <h4 class="text-xl">{{ title_text }}</h4>
    </section>
    <p>{{ message_text }}</p>
  </div>
</template>
