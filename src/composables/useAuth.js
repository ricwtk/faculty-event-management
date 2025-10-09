// src/composables/useAuth.js
import { ref } from "vue";
import { auth } from "../firebase";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  onAuthStateChanged,
  isSignInWithEmailLink
} from "firebase/auth";

export const user = ref(null);

onAuthStateChanged(auth, (u) => (user.value = u));

// Step 1: send sign-in email link
export async function sendLoginLink(email) {
  const actionCodeSettings = {
    url: import.meta.env.VITE_SITE_URL, // must match Firebase config
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
}

// Step 2: when user clicks link and opens your site
export async function completeSignIn() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please confirm your email for sign-in");
    }
    const result = await signInWithEmailLink(auth, email, window.location.href);
    console.log(result)
    window.localStorage.removeItem("emailForSignIn");
    return result.user;
  }
}
