<template>
  <Card>
    <template #title>
      <div class="flex flex-row items-center">
        <div class="flex-1">Name of the event</div>
        <Button icon="pi pi-pencil" class="flex-none" rounded variant="text"></Button>
      </div>
    </template>
    <template #content>
      <div>
        <div class="text-xs mt-2">Slots</div>
        <div class="px-5">
          <TimeSlots :slots="props.slots"></TimeSlots>
        </div>
        <div class="text-xs mt-2">PICs</div>
        <div class="px-5">
          <Pics :pics="props.pics"></Pics>
        </div>
        <div class="text-xs mt-2">Remarks</div>
        <div class="px-5">dfksahkdlfjhklufhskjfh dfiuha disfhia dsfilu dsliu fsdliu</div>
      </div>
    </template>
  </Card>
</template>

<script setup>
const props = defineProps([
  "name",
  "slots",
  "pics",
  "remarks"
])
// name: string
// slots: [date: string, time: string, name: string, remarks: string]
// pics: [name: string, role: string, confirmed: bool]
// remarks: string
</script>