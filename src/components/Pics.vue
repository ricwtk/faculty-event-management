<template>
  <DataView :value="pics">
    <template #list="slotProps">
      <div class="flex flex-col gap-2 text-sm">
        <div v-for="(item, index) in slotProps.items" :key="index" class="flex flex-col">
          <div class="flex flex-row items-center gap-2">
            <div class="flex-none">
              <i class="pi pi-check text-green-500" v-if="item.confirmed"></i>
              <i class="pi pi-question text-red-500" v-else></i>
            </div>
            <div class="flex flex-col flex-1">
              <div class="text-base">{{ item.name }}</div>
              <div class="text-gray-500">{{ item.role }}</div>
            </div>
          </div>
          <!-- <Divider v-if="index < slotProps.items.length-1"></Divider> -->
        </div>
      </div>
    </template>
  </DataView>
</template>

<script setup>
defineProps(["pics"])
</script>