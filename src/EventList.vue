<template>
  <div class="w-full flex flex-col items-center p-5 gap-2">
    <Button class="w-5xl" @click="addEvent"><i class="pi pi-plus"></i>Add event</Button>
    <EventItem v-for="ev in events" class="w-5xl"
      :name="ev.name"
      :slots="ev.slots"
      :pics="ev.pics"
      :remarks="ev.remarks"
    ></EventItem>
  </div>
  <Dialog v-model:visible="showEventEdit" modal header="Edit Event" class="w-5xl">
    <div></div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const events = ref([{
  "name": "dfafkjdhs",
  "slots": [{
    "date": "2025-12-12",
    "time": "11:30 - 12:30",
    "name": "dfsaf",
    "remarks": "fdasf"
  },{
    "date": "2025-12-12",
    "time": "11:30 - 12:30",
    "name": "dfsaf",
    "remarks": ""
  }],
  "pics": [{
    "name": "ociroasdf",
    "role": "fdsakfh",
    "confirmed": true
  },{
    "name": "ociroasdf",
    "role": "fdsakfh",
    "confirmed": false
  }],
  "remarks": "dsiagiusdcuhsdiu"
},])

const showEventEdit = ref(true)

const addEvent = () => {
  showEventEdit.value = true
}
</script>
