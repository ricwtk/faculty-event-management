<template>
  <div class="w-full flex flex-col items-center p-5 gap-2">
    <Button class="w-5xl" @click="addNewEvent"><i class="pi pi-plus"></i>Add event</Button>
    <EventItem v-for="ev in events" class="w-5xl"
      :name="ev.name"
      :slots="ev.slots"
      :pics="ev.pics"
      :remarks="ev.remarks"
    ></EventItem>
  </div>
  <Dialog v-model:visible="showEventEdit" modal header="Edit Event" class="w-5xl">
    <EventEdit 
      v-model:name="newevname"
      v-model:evtypes="newevevtypes"
      v-model:pics="newevpics"
      v-model:slots="newevslots"
      v-model:remarks="newevremarks"
    ></EventEdit>
    <div class="flex justify-end gap-2 mt-2">
      <Button type="button" label="Cancel" severity="secondary" @click="showEventEdit=false"></Button>
      <Button type="button" label="Save" @click="saveEvent"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const events = ref([{
  "eventidx": 10,
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
const editingEventIdx = ref(-1) // index of event in db
const addNewEvent = () => {
  if (editingEventIdx.value != -1) {
    editingEventIdx.value = -1
    newevname.value = ""
    newevevtypes.value = []
    newevpics.value = []
    newevslots.value = []
    newevremarks.value = []
  }
  showEventEdit.value = true
}

const newevname = ref("")
const newevevtypes = ref([])
const newevpics = ref([])
const newevslots = ref([])
const newevremarks = ref("")

const saveEvent = () => {
  let eventidxinlist = editingEventIdx.value == -1 ? events.value.length : editingEventIdx.value // index in the `events` list
  let newevent = {
    eventidx: -1,
    name: newevname.value,
    types: JSON.parse(JSON.stringify(newevevtypes.value)),
    slots: JSON.parse(JSON.stringify(newevslots.value)),
    pics: JSON.parse(JSON.stringify(newevpics.value)),
    remarks: newevremarks.value
  }
  events.value.splice(eventidxinlist, 0, newevent)

  // save to database and return eventidx 
}
</script>
