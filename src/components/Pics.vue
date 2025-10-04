<template>
  <DataView :value="pics">
    <template #list="slotProps">
      <div class="flex flex-col text-sm">
        <div v-for="(item, index) in slotProps.items" :key="index" class="flex flex-col hover:bg-gray-100 p-1 rounded-sm">
          <div class="flex flex-row items-center gap-2">
            <div class="flex-none">
              <Button v-if="edit" @click="item.confirmed = !item.confirmed" icon="pi" rounded link>
                <i class="pi pi-check text-green-500" v-if="item.confirmed"></i>
                <i class="pi pi-question text-red-500" v-else></i>
              </Button>
              <template v-else>
                <i class="pi pi-check text-green-500" v-if="item.confirmed"></i>
                <i class="pi pi-question text-red-500" v-else></i>
              </template>
            </div>
            <div class="flex flex-col flex-1">
              <div class="text-base">{{ item.name }}</div>
              <div class="text-gray-500">{{ item.role }}</div>
            </div>
            <div class="flex-none" v-if="edit">
              <Button v-if="edit" @click="" icon="pi" rounded link>
                <i class="pi pi-times text-red-500"></i>
              </Button>
            </div>
          </div>
          <!-- <Divider v-if="index < slotProps.items.length-1"></Divider> -->
        </div>
      </div>
    </template>
  </DataView>
</template>

<script setup>
defineProps({
  pics: Array,
  edit: Boolean
})
</script>