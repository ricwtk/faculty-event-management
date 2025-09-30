<template>
  <Card>
    <template #title><div class="font-bold text-4xl">Login</div></template>
    <template #subtitle>FET faculty event management</template>
    <template #content>
      <div class="flex flex-col gap-2 my-5">
        <InputText v-model="email" name="email" type="text" placeholder="Email" />
        <InputOtp v-if="otpRequested" v-model="otp" name="otp" :length="6" class="justify-center"/>
        <Button v-if="!otpRequested" @click="requestotp">Request OTP</Button>
        <template v-else>
          <Button @click="signin">Sign in</Button>
          <Button link @click="requestotp">Resend OTP</Button>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
const otpRequested = ref(false)
const email = ref("")
const otp = ref()

const requestotp = () => {
  otpRequested.value = true
}

const signin = () => {
}
</script>