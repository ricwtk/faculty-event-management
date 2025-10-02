<template>
  <Card>
    <template #title>
      <div class="flex flex-col text-sm">
        <FloatLabel variant="on">
          <InputText id="eventname" v-model="name" class="w-full"/>
          <label for="eventname">Event Name</label>
        </FloatLabel>
        <!-- <InputText class="flex-1" v-model="name" placeholder="event name"></InputText> -->
      </div>
    </template>
    <template #content>
      <div>
        <div class="text-xs mt-2">Slots</div>
        <div class="flex flex-col gap-2 text-sm pt-2">
          <TimeSlotEdit v-model="newslot"></TimeSlotEdit>
          <Button><i class="pi pi-plus"></i>Add</Button>
        </div>
        <div class="px-5 mt-2">
          <TimeSlots :slots="slots"></TimeSlots>
        </div>
        <div class="text-xs mt-2">PICs</div>
        <div class="flex flex-col gap-2 text-sm pt-2">
          <PicEdit v-model="newpic"></PicEdit>
          <Button><i class="pi pi-plus"></i>Add</Button>
        </div>
        <div class="px-5 mt-2">
          <Pics :pics="pics"></Pics>
        </div>
        <!-- <div class="text-xs mt-2">Remarks</div> -->
        <div class="flex flex-col gap-2 text-sm mt-2">
          <FloatLabel variant="on">
            <Textarea id="remarks" v-model="remarks" class="w-full"/>
            <label for="remarks" class="text-xs">Event Remarks</label>
          </FloatLabel>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
const name = defineModel("name")
const slots = defineModel("slots")
const pics = defineModel("pics")
const remarks = defineModel("remarks")

// name: string
// slots: [date: string, time: string, name: string, remarks: string]
// pics: [name: string, role: string, confirmed: bool]
// remarks: string

import { ref } from 'vue'
const newslot = ref({
  "date": "",
  "time": "",
  "duration": "",
  "name": "",
  "remarks": ""
})
const newpic = ref({
  "name": "",
  "role": "",
  "confirmed": ""
})
</script>