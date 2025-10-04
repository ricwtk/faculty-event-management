<template>
  <div class="flex flex-col sm:flex-row gap-2">
    <FloatLabel variant="on" class="flex-1">
      <DatePicker id="date" v-model="model.date" class="w-full" fluid/>
      <label for="date">Date</label>
    </FloatLabel>
    <FloatLabel variant="on" class="flex-1">
      <DatePicker id="time" v-model="model.time" class="w-full" fluid time-only/>
      <label for="time">Time</label>
    </FloatLabel>
  </div>
  <FloatLabel variant="on">
    <!-- <DatePicker id="duration" v-model="model.duration" class="w-full" fluid time-only/> -->
    <Panel style="border: 1px solid var(--p-inputtext-border-color)">
      <div class="flex flex-row justify-center items-center gap-2">
        <InputNumber v-model="model.duration.hour" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99">
          <template #incrementicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span>hours</span>
        <InputNumber v-model="model.duration.minute" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="59">
          <template #incrementicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <span>minutes</span>
      </div>
    </Panel>
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