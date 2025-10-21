<template>
  <i :class="['pi', `pi-${iconname}`]" :style="{ color: iconcolor }" :title="permission"></i>  
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(["active", "permission"])

const iconname = computed( () => {
  switch (props.permission) {
    case "view":
      return "eye"
    case "edit":
      return "pencil"
    case "create":
      return "plus-circle"
    case "delete":
      return "minus-circle"
    default:
      return "circle-fill"
  }
})
const iconcolor = computed( () => props.active ? 'green' : 'red' )
</script>