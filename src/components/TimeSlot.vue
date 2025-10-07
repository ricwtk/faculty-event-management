<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center gap-1">
      <i class="pi pi-calendar text-gray-400"></i>
      {{ getdatedisplay(datetime) }}
      <Divider layout="vertical"></Divider>
      <i class="pi pi-clock text-gray-400"></i>
      {{ gettimedisplay(datetime) }}
      <Divider layout="vertical"></Divider>
      <i class="pi pi-stopwatch text-gray-400"></i>
      {{ duration.hour }} hr {{ duration.minute }} min
    </div>
    <div class="text-base">{{ name }}</div>
    <div class="text-gray-500">{{ remarks }}</div>
    <!-- <Divider v-if="index < slotProps.items.length-1"></Divider> -->
  </div>
</template>

<script setup>
defineProps(["datetime", "duration", "name", "remarks"])

const zpad = (x) => String(x).padStart(2, '0')
const getdatedisplay = (dt) => {
  return `${zpad(dt.getDate())}-${zpad(dt.getMonth())}-${zpad(dt.getFullYear())}`
}
const gettimedisplay = (dt) => {
  return `${zpad(dt.getHours())}:${zpad(dt.getMinutes())}`
}
</script>