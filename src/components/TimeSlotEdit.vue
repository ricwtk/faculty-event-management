<template>
  <Panel toggleable :collapsed="true">
    <template #header>
      <div class="flex flex-col">
        <div class="flex flex-row items-center gap-1">
          <i class="pi pi-calendar text-gray-400"></i>
          {{ getdatedisplay(datetime) }}
          <Divider layout="vertical"></Divider>
          <i class="pi pi-clock text-gray-400"></i>
          {{ gettimedisplay(datetime) }}
          <Divider layout="vertical"></Divider>
          <i class="pi pi-stopwatch text-gray-400"></i>
          {{ duration.hour }} hr {{ duration.minute }} min
        </div>
        <div class="text-base">{{ name }}</div>
        <div class="text-gray-500">{{ remarks }}</div>
        <!-- <Divider v-if="index < slotProps.items.length-1"></Divider> -->
      </div>
    </template>
    <template #toggleicon="{ collapsed }">
      <i v-if="collapsed" class="pi pi-pencil"></i>
      <i v-else class="pi pi-minus"></i>
    </template>
    <template #icons>
      <Button icon="pi pi-times text-red-500" link @click="deleteitem"></Button>
    </template>
    <div class="flex flex-col gap-1 mt-2">
      <div class="flex flex-col lg:flex-row gap-1">
        <FloatLabel variant="on" class="flex-1">
          <!-- <DatePicker id="duration" v-model="model.duration" class="w-full" fluid time-only/> -->
          <Panel style="border: 1px solid var(--p-inputtext-border-color)" class="h-full">
            <div class="flex flex-row justify-center items-center gap-2">
              <DatePicker id="date" v-model="datetime" class="w-lg" fluid dateFormat="dd/mm/yy" showTime hourFormat="24" showWeek showButtonBar/>
            </div>
          </Panel>
          <label for="date">Datetime</label>
        </FloatLabel>
        <FloatLabel variant="on" class="flex-1">
          <!-- <DatePicker id="duration" v-model="model.duration" class="w-full" fluid time-only/> -->
          <Panel style="border: 1px solid var(--p-inputtext-border-color)" class="h-full flex flex-row" :pt="{
            'contentContainer': 'flex flex-col flex-1'
          }">
            <div class="flex flex-row justify-center items-center gap-2">
              <InputNumber v-model="duration.hour" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99">
                <template #incrementicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
              <span>hours</span>
              <InputNumber v-model="duration.minute" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="59">
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
      </div>
      <FloatLabel variant="on">
        <InputText id="name" v-model="name" class="w-full" fluid/>
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Textarea id="remarks" v-model="remarks" class="w-full"/>
        <label for="remarks">Remarks</label>
      </FloatLabel>
    </div>

  </Panel>

  <!-- <InputText placeholder="date" v-model="model.date"></InputText>
  <InputText placeholder="time" v-model="model.time"></InputText>
  <InputText placeholder="name" v-model="model.name"></InputText>
  <InputText placeholder="remarks" v-model="model.remarks"></InputText> -->
</template>

<script setup>
const datetime = defineModel("datetime")
const duration = defineModel("duration")
const name = defineModel("name")
const remarks = defineModel("remarks")

const zpad = (x) => String(x).padStart(2, '0')
const getdatedisplay = (dt) => {
  return `${zpad(dt.getDate())}-${zpad(dt.getMonth())}-${zpad(dt.getFullYear())}`
}
const gettimedisplay = (dt) => {
  return `${zpad(dt.getHours())}:${zpad(dt.getMinutes())}`
}

const emit = defineEmits(["delete"])
const deleteitem = () => {
  emit('delete')
}
</script>