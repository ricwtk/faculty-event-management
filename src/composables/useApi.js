// src/composables/useApi.js
import { getAuth } from "firebase/auth";

const API_BASE = import.meta.env.VITE_CLOUDRUN_URL

export async function useApi(path, options = {}) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not signed in");

  const token = await user.getIdToken(); // Retrieve ID token (JWT)
  
  const headers = {
    ...(options.headers || {}),
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    console.log(res)
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}
