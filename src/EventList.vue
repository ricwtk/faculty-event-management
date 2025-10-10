<template>
  <div class="w-full flex flex-col items-center p-5 gap-2">
    <div class="bg-black w-5xl px-2 py-1 rounded text-xs flex flex-row items-center">
      <div class="flex-1 text-white">
        Logged in as {{ user ? user.email : "" }}
      </div>
      <Button @click="logout" label="Log out" severity="secondary" :pt="{
        label: 'text-xs'
      }"></Button>
    </div>
    <Button class="w-5xl" @click="addNewEvent"><i class="pi pi-plus"></i>Add event</Button>
    <EventItem v-for="(ev, eIdx) in events" class="w-5xl"
      :name="ev.name"
      :types="ev.types"
      :slots="ev.slots"
      :pics="ev.pics"
      :remarks="ev.remarks"
      @edit="editEventItem(eIdx)"
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
import { user } from './composables/useAuth';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const events = ref([])

const showEventEdit = ref(false)
const editingEventIdx = ref(-1) // index of event in db
const addNewEvent = () => {
  if (editingEventIdx.value != -1) {
    editingEventIdx.value = -1
    newevname.value = ""
    newevevtypes.value = []
    newevpics.value = []
    newevslots.value = []
    newevremarks.value = ""
  }
  showEventEdit.value = true
}

const newevname = ref("")
const newevevtypes = ref([])
const newevpics = ref([])
const newevslots = ref([])
const newevremarks = ref("")

const saveEvent = () => {
  let eventidxinlist = editingEventIdx.value == -1 ? events.value.length : events.value.findIndex(v => v.eventidx == editingEventIdx.value) // index in the `events` list
  let newevent = {
    eventidx: editingEventIdx.value,
    name: newevname.value,
    types: newevevtypes.value.map(v => v),
    slots: newevslots.value.map(v => ({
      datetime: v.datetime,
      duration: {
        hour: v.duration.hour,
        minute: v.duration.minute
      },
      name: v.name,
      remarks: v.remarks
    })),
    pics: newevpics.value.map(v => ({
      name: v.name,
      role: v.role,
      confirmed: v.confirmed
    })),
    remarks: newevremarks.value
  }
  let removeN = editingEventIdx.value == -1 ? 0 : 1
  events.value.splice(eventidxinlist, removeN, newevent)

  // console.log(editingEventIdx.value, eventidxinlist, removeN)

  showEventEdit.value = false

  // save to database and return eventidx 

  if (editingEventIdx.value == -1) {
    // get a unique mock index
    let newevidx = 0
    while (events.value.map(ev => ev.eventidx).includes(newevidx)) newevidx++
    events.value[events.value.length-1].eventidx = newevidx
  }
}

const editEventItem = (idx) => {
  let ev = events.value[idx]
  editingEventIdx.value = ev.eventidx
  newevname.value = ev.name
  newevevtypes.value = ev.types.map(v => v)
  newevpics.value = ev.pics.map(v => ({
    name: v.name,
    role: v.role,
    confirmed: v.confirmed
  }))
  newevslots.value = ev.slots.map(v => ({
    datetime: v.datetime,
    duration: {
      hour: v.duration.hour,
      minute: v.duration.minute
    },
    name: v.name,
    remarks: v.remarks
  }))
  newevremarks.value = ev.remarks
  showEventEdit.value = true
}

onAuthStateChanged(auth, (u) => {
  if (!u) {
    window.location.href = window.location.origin
  } else {
    user.value = u
  }
});

const logout = () => {
  signOut(auth)
}
</script>
