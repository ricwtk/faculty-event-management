<template>
  <div class="w-full flex flex-col items-center p-5 gap-2">
    <div class="bg-black w-5xl px-2 py-1 rounded text-xs flex flex-row items-center">
      <div class="flex-1 text-white">
        Logged in as {{ user ? user.display : "" }} ({{ user ? user.email : "" }})
      </div>
      <Button @click="logout" label="Log out" severity="secondary" :pt="{
        label: 'text-xs'
      }"></Button>
    </div>
    <div v-if="user && !user.id" class="w-5xl">
      Contact Dr Richard Wong from SEN to request for permission to view the FET event page
    </div>
    <Button class="w-5xl" v-if="user && user.roles.includes('eventCreate')" @click="addNewEvent"><i class="pi pi-plus"></i>Add event</Button>
    <EventItem v-for="(ev, eIdx) in events" class="w-5xl"
      :id="ev.id"
      :name="ev.name"
      :categories="ev.categories"
      :slots="ev.slots"
      :pics="ev.pics"
      :remarks="ev.remarks"
      @edit="editEventItem(eIdx)"
      :allow-edit="user && user.roles.includes('eventEdit')"
    ></EventItem>
  </div>
  <Dialog v-model:visible="showEventEdit" modal header="Edit Event" class="w-5xl">
    <EventEdit 
      v-model:name="newevname"
      v-model:evcategories="newevevcategories"
      v-model:pics="newevpics"
      v-model:slots="newevslots"
      v-model:remarks="newevremarks"
    ></EventEdit>
    <div class="flex mt-2">
      <div class="flex-0">
        <Button type="button" severity="danger" label="Delete" @click="deleteEvent" v-if="user && user.roles.includes('eventDelete')"></Button>
      </div>
      <div class="flex-1 flex justify-end gap-2 mt-2">
        <Button type="button" label="Cancel" severity="secondary" @click="showEventEdit=false"></Button>
        <Button type="button" label="Save" @click="saveEvent"></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { user } from './composables/useAuth';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useApi } from './composables/useApi';

const events = ref([])

const showEventEdit = ref(false)
const editingEventId = ref(-1) // index of event in db
const addNewEvent = () => {
  if (editingEventId.value != -1) {
    editingEventId.value = -1
    newevname.value = ""
    newevevcategories.value = []
    newevpics.value = []
    newevslots.value = []
    newevremarks.value = ""
  }
  showEventEdit.value = true
}

const newevname = ref("")
const newevevcategories = ref([])
const newevpics = ref([])
const newevslots = ref([])
const newevremarks = ref("")

const saveEvent = () => {
  let eventidxinlist = editingEventId.value == -1 ? events.value.length : events.value.findIndex(v => v.id == editingEventId.value) // index in the `events` list
  let newevent = {
    id: editingEventId.value,
    name: newevname.value,
    categories: newevevcategories.value.map(v => v),
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
  let removeN = editingEventId.value == -1 ? 0 : 1
  events.value.splice(eventidxinlist, removeN, newevent)
  // console.log(editingEventId.value, eventidxinlist, removeN)

  showEventEdit.value = false

  // save to database and return eventid
  saveEventOnDb(newevent).then((r) => {
    if (editingEventId.value == -1) {
      events.value[events.value.length-1].id = r.id
    }
  })
}

const editEventItem = (idx) => {
  let ev = events.value[idx]
  editingEventId.value = ev.id
  newevname.value = ev.name
  newevevcategories.value = ev.categories.map(v => v)
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

const deleteEvent = (idx) => {

}

onAuthStateChanged(auth, (u) => {
  if (!u) {
    window.location.href = window.location.origin
  } else {
    getUserMeta(u)
    .then(getEvents)
    
    // getEvents()
  }
});

const getUserMeta = (u) => {
  return useApi(`/users?email=${u.email}`)
    .then((uinfo) => {
      user.value = uinfo
      console.log(uinfo)
    })
    .catch((error) => {
      user.value = {
        id: null,
        display: "",
        email: u.email,
        roles: ["workshopView"]
      }
      // window.alert(`${error.message}`)
    })
}

const getEvents = () => {
  return useApi("/events")
  .then((eventsFromDb) => {
    events.value = eventsFromDb.map(ev => ({
      id: ev.id,
      name: ev.name,
      categories: ev.categories.map(v => v),
      slots: ev.slots.map(v => ({
        datetime: new Date(v.datetime),
        duration: {
          hour: v.duration.hour,
          minute: v.duration.minute
        },
        name: v.name,
        remarks: v.remarks
      })),
      pics: ev.pics.map(v => ({
        name: v.name,
        role: v.role,
        confirmed: v.confirmed
      })),
      remarks: ev.remarks
    }))
  })
}

const saveEventOnDb = (ev) => {
  let evdata = {
    name: ev.name,
    categories: ev.categories.map(v => v),
    slots: ev.slots.map(v => ({
      datetime: v.datetime.toISOString(),
      duration: {
        hour: v.duration.hour,
        minute: v.duration.minute
      },
      name: v.name,
      remarks: v.remarks
    })),
    pics: ev.pics.map(v => ({
      name: v.name,
      role: v.role,
      confirmed: v.confirmed
    })),
    remarks: ev.remarks
  }
  if (ev.id == -1) {
    return useApi("/events", {
      method: "POST",
      body: JSON.stringify(evdata)
    })
  } else {
    return useApi(`/events/${ev.id}`, {
      method: "PUT",
      body: JSON.stringify(evdata)
    })
  }
}

const deleteEventOnDb = (ev) => {

}

const logout = () => {
  signOut(auth)
}
</script>
