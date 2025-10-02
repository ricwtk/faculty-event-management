<template>
  <FloatLabel variant="on">
    <DatePicker id="date" v-model="model.date" class="w-full" fluid/>
    <label for="date">Date</label>
  </FloatLabel>
  <FloatLabel variant="on">
    <DatePicker id="time" v-model="model.time" class="w-full" fluid time-only/>
    <label for="time">Time</label>
  </FloatLabel>
  <FloatLabel variant="on">
    <DatePicker id="duration" v-model="model.duration" class="w-full" fluid time-only/>
    <label for="duration">Duration</label>
  </FloatLabel>
  <FloatLabel variant="on">
    <InputText id="name" v-model="model.name" class="w-full" fluid/>
    <label for="name">Name</label>
  </FloatLabel>
  <FloatLabel variant="on">
    <Textarea id="remarks" v-model="model.remarks" class="w-full"/>
    <label for="remarks">Remarks</label>
  </FloatLabel>

  <!-- <InputText placeholder="date" v-model="model.date"></InputText>
  <InputText placeholder="time" v-model="model.time"></InputText>
  <InputText placeholder="name" v-model="model.name"></InputText>
  <InputText placeholder="remarks" v-model="model.remarks"></InputText> -->
</template>

<script setup>
const model = defineModel()
</script>