<template>
  <div class="w-full flex flex-col items-center p-5 gap-2">
    <div class="bg-black w-5xl px-2 py-1 rounded text-xs flex flex-row items-center">
      <div class="flex-1 text-white">
        Logged in as {{ user ? user.display : "" }} ({{ user ? user.email : "" }})
      </div>
      <Button @click="logout" label="Log out" severity="secondary" :pt="{
        label: 'text-xs'
      }"></Button>
    </div>
    <div class="w-5xl p-2 rounded flex gap-2">
      <Button label="Add single user" icon="pi pi-user" severity="secondary"></Button>
      <Button label="Add multiple users" icon="pi pi-users" severity="secondary"></Button>
    </div>
    <div class="flex gap-2 items-center w-5xl">
      <InputText
        v-model="searchTerm"
        placeholder="Search by name or email"
        fluid
      />
      <Button
        label="Search"
        icon="pi pi-search"
        severity="secondary"
        @click="loadUsers({ first: 0, rows: rows })"
      />
    </div>
    <DataView
      :value="users"
      :lazy="true"
      :paginator="true"
      :rows="rows"
      :totalRecords="totalRecords"
      :first="first"
      @page="loadUsers"
      :loading="loading"
      class="w-5xl"
    >
      <template #list="slotProps">
        <div v-for="user in slotProps.items" :key="user.id" class="p-3 border-b">
          <div class="font-medium">{{ user.display }}</div>
          <div class="text-sm text-gray-500">{{ user.email }}</div>
          <div class="text-xs text-primary-600 mt-1">Roles: {{ user.roles.join(', ') }}</div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { user } from './composables/useAuth';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useApi } from './composables/useApi';
import { useToast } from 'primevue/usetoast';

onAuthStateChanged(auth, (u) => {
  if (!u) {
    window.location.href = import.meta.env.VITE_BASE_URL
  } else {
    getUserMeta(u)
    loadUsers({ first: 0, rows: rows.value })
  }
});

const logout = () => {
  signOut(auth)
}

const getUserMeta = (u) => {
  return useApi("/me")
    .then((uinfo) => {
      user.value = uinfo
      // console.log(uinfo)
    })
    .catch((error) => {
      user.value = {
        id: null,
        display: "",
        email: u.email,
        roles: ["workshopView"]
      }
      // window.alert(`${error.message}`)
    })
}

const users = ref([]);
const totalRecords = ref(0);
const rows = ref(10);
const first = ref(0); // offset
const loading = ref(false);

async function loadUsers(event) {
  loading.value = true;
  const limit = event.rows;
  const offset = event.first;
  const search = debouncedSearch.value ? `&q=${encodeURIComponent(debouncedSearch.value)}` : "";

  return useApi(`/users?limit=${limit}&offset=${offset}${search}`)
  .then(data => {
    users.value = data.users
    totalRecords.value = data.total
    first.value = offset
  })
  .catch(err => console.error("Failed to load users", err))
  .finally(() => { loading.value = false })
}

const searchTerm = ref(""); // user input
const debouncedSearch = ref(""); // value after debounce
let debounceTimer;

watch(searchTerm, (newVal) => {
  clearTimeout(debounceTimer);
  // debounce to avoid too many API calls
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = newVal.trim();
    // reset to first page when search changes
    loadUsers({ first: 0, rows: rows.value });
  }, 500);
});

</script>