<template>
  <!-- <Card> -->
    <!-- <template #title> -->
      <div class="flex flex-col text-sm gap-2 mt-2">
        <FloatLabel variant="on">
          <InputText id="eventname" v-model="name" class="w-full"/>
          <label for="eventname">Event Name</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <AutoComplete id="eventtype" class="w-full" @keyup.enter="addevtype" v-model="category" :suggestions="filteredcategories" @complete="searchcategory" fluid/>
          <label for="eventtype">Event Type</label>
        </FloatLabel>
        <div class="text-xs">Use enter to register the event type</div>
        <div class="pt-1 flex gap-1 text-xs">
          <Chip v-for="(tp, idx) in evcategories" :label="tp" :key="idx" removable @remove="removeevtype(tp)"></Chip>
        </div>
        <!-- {{ evcategories }} -->
        <!-- <InputText class="flex-1" v-model="name" placeholder="event name"></InputText> -->
      <!-- </div> -->
    <!-- </template> -->
    <!-- <template #content> -->
      <!-- <div> -->
        <Divider></Divider>
        <div class="text-xs">Slots</div>
        <div class="flex flex-col gap-3">
          <TimeSlotEdit v-for="(slot, sidx) in slots" 
            v-model:datetime="slot.datetime"
            v-model:duration="slot.duration"
            v-model:name="slot.name"
            v-model:remarks="slot.remarks"
            @delete="deleteslot(sidx)"
          ></TimeSlotEdit>
          <Button severity="secondary" @click="addslot"><i class="pi pi-plus"></i>Add</Button>
        </div>

        <!-- <div class="flex flex-col gap-2 text-sm pt-2">
          <TimeSlotEdit v-model="newslot"></TimeSlotEdit>
          <Button severity="secondary"><i class="pi pi-plus"></i>Add</Button>
        </div>
        <div class="px-5 mt-2">
          <TimeSlots :slots="slots"></TimeSlots>
        </div> -->
        <Divider></Divider>
        <div class="text-xs">PICs</div>
        <div class="flex flex-col gap-3">
          <PicEdit v-for="(pic, pidx) in pics" 
            :picnamelist="picnamelist"
            :picrolelist="picrolelist"
            v-model:name="pic.name"
            v-model:role="pic.role"
            v-model:confirmed="pic.confirmed"
            @delete="deletepic(pidx)"
          ></PicEdit>
          <Button severity="secondary" @click="addpic"><i class="pi pi-plus"></i>Add</Button>
        </div>
        <Divider></Divider>
        <!-- <div class="text-xs mt-2">Remarks</div> -->
         <div class="text-xs">Event Remarks</div>
        <Editor id="remarks" v-model="remarks" editorStyle="height: 300px" class="w-full">
          <template v-slot:toolbar>
            <span class="ql-formats">
              <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
              <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
              <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
            </span>
          </template>
        </Editor>
      </div>
    <!-- </template> -->
  <!-- </Card> -->
</template>

<script setup>
import { ref } from 'vue'
const name = defineModel("name")
const evcategories = defineModel("evcategories")
const slots = defineModel("slots")
const pics = defineModel("pics")
const remarks = defineModel("remarks")

const props = defineProps(['categorylist', 'picnamelist', 'picrolelist'])
const category = ref("")
const filteredcategories = ref([])
const searchcategory = () => {
  filteredcategories.value = props.categorylist.filter(v => v.includes(category.value))
}

// name: string
// slots: [date: string, time: string, name: string, remarks: string]
// pics: [name: string, role: string, confirmed: bool]
// remarks: string

const addevtype = () => {
  let evcategory = category.value.trim()
  if (!evcategories.value.includes(evcategory)) {
    evcategories.value.push(evcategory)
  }
  category.value = ""
}
const removeevtype = (toremove) => {
  console.log(toremove)
  evcategories.value = evcategories.value.filter(item => item !== toremove);
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

const addslot = () => {
  slots.value.push({ 
    datetime: new Date(),
    duration: {
      hour: 2,
      minute: 0
    },
    name: "",
    remarks: ""
  })
}
const deleteslot = (idx) => {
  console.log(idx)
  slots.value.splice(idx, 1)
}
</script>