<template>
  <DataView :value="slots">
    <template #list="slotProps">
      <div class="flex flex-col gap-2 text-sm">
        <div v-for="(item, index) in slotProps.items" :key="index" class="flex flex-col">
          <div class="">{{ item.date }} {{ item.time }}</div>
          <div class="text-base">{{ item.name }}</div>
          <div class="text-gray-500">{{ item.remarks }}</div>
        </div>
      </div>
    </template>
  </DataView>
  <!-- <div class="flex flex-row">
    <div class="flex-none w-28">2025-12-12</div>
    <div class="flex-none w-28">11:30 - 12:30</div>
    <div class="flex-1">workshop</div>
    <div class="flex-1">remarks</div>
  </div> -->
</template>

<script setup>
defineProps(["slots"])
</script>