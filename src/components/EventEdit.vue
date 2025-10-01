<template>
  <Card>
    <template #title>
      <div class="flex flex-row items-center">
        <InputText class="flex-1" v-model="name"></InputText>
      </div>
    </template>
    <template #content>
      <div>
        <div class="text-xs mt-2">Slots</div>
        <div class="px-5">
          <TimeSlots :slots="slots"></TimeSlots>
        </div>
        <div class="text-xs mt-2">PICs</div>
        <div class="px-5">
          <Pics :pics="pics"></Pics>
        </div>
        <div class="text-xs mt-2">Remarks</div>
        <InputText v-model="remarks" class="w-full"></InputText>
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
</script>