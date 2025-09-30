<template>
  <div class="w-full flex justify-center p-5">
    <EventItem v-for="ev in events" class="w-lg"
      :name="ev.name"
      :slots="ev.slots"
      :pics="ev.pics"
      :remarks="ev.remarks"
    ></EventItem>
  </div>
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
</script>
