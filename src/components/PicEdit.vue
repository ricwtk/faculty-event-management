<template>
  <div class="flex flex-row items-center gap-1">
    <div class="flex-none">
      <Button @click="confirmed = !confirmed" icon="pi" rounded link>
        <i class="pi pi-check text-green-500" v-if="confirmed"></i>
        <i class="pi pi-question text-red-500" v-else></i>
      </Button>
    </div>
    <div class="flex flex-col sm:flex-row flex-1 gap-1">
      <FloatLabel variant="on" class="flex-1">
        <AutoComplete id="name" v-model="name" class="w-full" :suggestions="filteredname" @complete="searchname" fluid/>
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on" class="flex-1">
        <AutoComplete id="role" v-model="role" class="w-full" :suggestions="filteredrole" @complete="searchrole" fluid/>
        <label for="role">Role</label>
      </FloatLabel>
    </div>
    <div class="flex-none">
      <Button icon="pi" rounded link @click="deleteitem">
        <i class="pi pi-times text-red-500"></i>
      </Button>
    </div>
  </div>

  <!-- <FloatLabel variant="on">
    <AutoComplete id="name" v-model="model.name" class="w-full" fluid/>
    <label for="name">Name</label>
  </FloatLabel>
  <FloatLabel variant="on">
    <AutoComplete id="role" v-model="model.role" class="w-full" fluid/>
    <label for="role">Role</label>
  </FloatLabel> -->
      
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['picnamelist', 'picrolelist'])
const filteredname = ref([])
const filteredrole = ref([])
const searchname = () => {
  filteredname.value = props.picnamelist.filter(v => v.includes(name.value))
}
const searchrole = () => {
  filteredrole.value = props.picrolelist.filter(v => v.includes(role.value))
}
const name = defineModel("name")
const role = defineModel("role")
const confirmed = defineModel("confirmed")

const emit = defineEmits(["delete"])
const deleteitem = () => {
  emit('delete')
}
</script>