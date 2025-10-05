<template>
  <Panel toggleable>
    <template #header>
      <div class="flex flex-col">
        <div class="flex flex-row">{{ model.datetime }}<Divider layout="vertical"></Divider>{{ model.datetime }}</div>
        <div class="text-base">{{ model.name }}</div>
        <div class="text-gray-500">{{ model.remarks }}</div>
        <!-- <Divider v-if="index < slotProps.items.length-1"></Divider> -->
      </div>
    </template>
    <template #toggleicon="{ collapsed }">
      <i v-if="collapsed" class="pi pi-pencil"></i>
      <i v-else class="pi pi-times"></i>
    </template>
    <div class="flex flex-col gap-1">
      <div class="flex flex-col lg:flex-row gap-1">
        <FloatLabel variant="on" class="flex-1">
          <!-- <DatePicker id="duration" v-model="model.duration" class="w-full" fluid time-only/> -->
          <Panel style="border: 1px solid var(--p-inputtext-border-color)">
            <div class="flex flex-row justify-center items-center gap-2">
              <DatePicker id="date" v-model="model.datetime" class="w-lg" fluid dateFormat="dd/mm/yy" showTime hourFormat="24" inline showWeek showButtonBar/>
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
      </div>
      <FloatLabel variant="on">
        <InputText id="name" v-model="model.name" class="w-full" fluid/>
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Textarea id="remarks" v-model="model.remarks" class="w-full"/>
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
const model = defineModel()
</script>