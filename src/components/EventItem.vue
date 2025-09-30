<template>
  <Card>
    <template #title>Name of the event</template>
    <template #content>
      <div class="w-md">
        <div class="text-xs mt-2">Slots</div>
        <div class="px-5">
          <TimeSlots :slots="props.slots"></TimeSlots>
        </div>
        <div class="text-xs mt-2">PICs</div>
        <div class="px-5">PIC list</div>
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