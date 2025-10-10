<template>
  <Card>
    <template #title><div class="font-bold text-4xl">Login</div></template>
    <template #subtitle>FET faculty event management</template>
    <template #content>
      <div class="flex flex-col gap-2 my-5">
        <InputText v-model="email" name="email" type="text" placeholder="Email" />
        <Button @click="sendLink" :disabled="linkSent">
          <template v-if="!linkSent">
            Continue with Email
          </template>
          <template v-else>
            Request again in {{ countdown }} s
          </template>
        </Button>
        <div class="text-xs text-center" v-if="linkSent">
          Check your inbox for the sign-in link sent by 
          <span class="font-mono">noreply@facultyeventmanager.firebaseapp.com</span>. It may be categorised as junk/spam.
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import { user, sendLoginLink, completeSignIn } from '../composables/useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const email = ref("")
const linkSent = ref(false)
const countdown = ref(0)
var timer = null

onAuthStateChanged(auth, (u) => {
  if (u) window.location.href = "/event-list.html";
})

const sendLink = () => {
  sendLoginLink(email.value).then(() => {
    linkSent.value = true
    countdown.value = 60
  
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        linkSent.value = false
      }
    }, 1000)
  })
}

completeSignIn()

</script>