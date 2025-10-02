<template>
  <!-- <div class="flex flex-row items-center gap-2 pt-2"> -->
    <!-- <div class="flex-none"> -->
      <!-- <Checkbox v-model="model.confirmed" binary></Checkbox> -->
    <!-- </div> -->
    <!-- <div class="flex flex-col flex-1 gap-2"> -->
      <FloatLabel variant="on">
        <AutoComplete id="name" v-model="model.name" class="w-full" fluid/>
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <AutoComplete id="role" v-model="model.role" class="w-full" fluid/>
        <label for="role">Role</label>
      </FloatLabel>
      <!-- <div class="text-base">{{ model.name }}</div>
      <div class="text-gray-500">{{ model.role }}</div> -->
    <!-- </div> -->
  <!-- </div> -->
</template>

<script setup>
import { AutoComplete } from 'primevue';

const model = defineModel()
</script>