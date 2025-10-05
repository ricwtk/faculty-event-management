<template>
  <!-- <Card> -->
    <!-- <template #title> -->
      <div class="flex flex-col text-sm gap-2 mt-2">
        <FloatLabel variant="on">
          <InputText id="eventname" v-model="name" class="w-full"/>
          <label for="eventname">Event Name</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <AutoComplete id="eventtype" class="w-full" @keyup.space="addevtype" @keyup.enter="addevtype" fluid/>
          <label for="eventtype">Event Type</label>
        </FloatLabel>
        <div class="text-xs">Use space or enter to register the event type</div>
        <div class="pt-1 flex gap-1 text-xs">
          <Chip v-for="(tp, idx) in evtypes" :label="tp" :key="idx" removable @remove="removeevtype(tp)"></Chip>
        </div>
        <!-- {{ evtypes }} -->
        <!-- <InputText class="flex-1" v-model="name" placeholder="event name"></InputText> -->
      <!-- </div> -->
    <!-- </template> -->
    <!-- <template #content> -->
      <!-- <div> -->
        <Divider></Divider>
        <div class="text-xs">Slots</div>
        <div class="flex flex-col gap-2 text-sm pt-2">
          <TimeSlotEdit v-model="newslot"></TimeSlotEdit>
          <Button severity="secondary"><i class="pi pi-plus"></i>Add</Button>
        </div>
        <div class="px-5 mt-2">
          <TimeSlots :slots="slots"></TimeSlots>
        </div>
        <Divider></Divider>
        <div class="text-xs">PICs</div>
        <div class="flex flex-col gap-3">
          <PicEdit v-for="(pic, pidx) in pics" 
            v-model:name="pic.name"
            v-model:role="pic.role"
            v-model:confirmed="pic.confirmed"
            @delete="deletepic(pidx)"
          ></PicEdit>
          <Button severity="secondary" @click="addpic"><i class="pi pi-plus"></i>Add</Button>
        </div>
        <Divider></Divider>
        <!-- <div class="text-xs mt-2">Remarks</div> -->
        <div class="flex flex-col gap-2 text-sm mt-2">
          <FloatLabel variant="on">
            <Textarea id="remarks" v-model="remarks" class="w-full"/>
            <label for="remarks" class="text-xs">Event Remarks</label>
          </FloatLabel>
        </div>
      </div>
    <!-- </template> -->
  <!-- </Card> -->
</template>

<script setup>
import { ref } from 'vue'
const name = defineModel("name")
const evtypes = defineModel("evtypes")
const slots = defineModel("slots")
const pics = defineModel("pics")
const remarks = defineModel("remarks")

// name: string
// slots: [date: string, time: string, name: string, remarks: string]
// pics: [name: string, role: string, confirmed: bool]
// remarks: string

const newslot = ref({
  "datetime": "",
  "time": "",
  "duration": {
    "hour": 2,
    "minute": 0
  },
  "name": "",
  "remarks": ""
})

const addevtype = (ev) => {
  let evtype = ev.target.value.trim()
  if (!evtypes.includes(evtype)) {
    evtypes.value.push(evtype)
  }
  ev.target.value = ""
}
const removeevtype = (toremove) => {
  console.log(toremove)
  evtypes.value = evtypes.value.filter(item => item !== toremove);
}

const addpic = () => {
  pics.value.push({ 
    name: "",
    role: "",
    confirmed: false
  })
}
const deletepic = (idx) => {
  console.log(idx)
  pics.value.splice(idx, 1)
}
</script>