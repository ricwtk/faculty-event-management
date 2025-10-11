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

// onAuthStateChanged(auth, (u) => {
//   if (u) {
//     user.value = u
//   }
// });

// Step 1: send sign-in email link
export function sendLoginLink(email) {
  const actionCodeSettings = {
    url: window.location.origin, // must match Firebase config
    handleCodeInApp: true,
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
    })
}

// Step 2: when user clicks link and opens your site
export function completeSignIn() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please confirm your email for sign-in");
    }
    console.log(window.location.href)
    return signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem("emailForSignIn");
      return result.user
    })
  } else {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }
}
