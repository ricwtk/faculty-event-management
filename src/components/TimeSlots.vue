<template>
  <DataView :value="slots">
    <template #list="slotProps">
      <div class="flex flex-col gap-2 text-sm">
        <div v-for="(item, index) in slotProps.items" :key="index" class="flex flex-col">
          <div class="flex flex-row">{{ item.date }}<Divider layout="vertical"></Divider>{{ item.time }}</div>
          <div class="text-base">{{ item.name }}</div>
          <div class="text-gray-500">{{ item.remarks }}</div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<script setup>
defineProps(["slots"])
</script>