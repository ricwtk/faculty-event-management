<template>
  <Card>
    <template #title>
      <div class="flex flex-row items-center">
        <div class="flex-1">{{ name }}</div>
        <Button icon="pi pi-pencil" class="flex-none" rounded variant="text" @click="editItem"></Button>
      </div>
    </template>
    <template #content>
      <div>
        <div class="pt-1 flex gap-1 text-xs">
          <Chip v-for="(tp, idx) in categories" :label="tp" :key="idx"></Chip>
        </div>
        <div class="text-xs mt-2">Slots</div>
        <div class="px-5">
          <div class="flex flex-col gap-3">
          <TimeSlot v-for="(slot, sidx) in slots" 
            :datetime="slot.datetime"
            :duration="slot.duration"
            :name="slot.name"
            :remarks="slot.remarks"
          ></TimeSlot>
        </div>
          <!-- <TimeSlots :slots="props.slots"></TimeSlots> -->
        </div>
        <div class="text-xs mt-2">PICs</div>
        <div class="px-5">
          <Pics :pics="pics"></Pics>
        </div>
        <div class="text-xs mt-2">Remarks</div>
        <div class="px-5">{{ remarks }}</div>
      </div>
    </template>
  </Card>
</template>

<script setup>
defineProps([
  "name",
  "slots",
  "categories",
  "pics",
  "remarks"
])
// name: string
// slots: [date: string, time: string, name: string, remarks: string]
// pics: [name: string, role: string, confirmed: bool]
// remarks: string
const emit = defineEmits(["edit"])
const editItem = () => {
  emit('edit')
}
</script>