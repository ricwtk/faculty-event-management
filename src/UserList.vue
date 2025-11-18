<template>
  <div class="w-full md:w-5xl flex flex-col items-center p-5 gap-2">
    <div class="bg-black w-full px-2 py-1 rounded text-xs flex flex-row items-center">
      <div class="flex-1 text-white">
        Logged in as {{ user ? user.display : "" }} ({{ user ? user.email : "" }})
      </div>
      <Button @click="logout" label="Log out" severity="secondary" :pt="{
        label: 'text-xs'
      }"></Button>
    </div>
    <div class="w-full p-2 rounded flex gap-2">
      <Button
        label="Add single user"
        icon="pi pi-user"
        severity="secondary"
        :pt="{ label: 'hidden sm:block' }"
      ></Button>
      <Button
        label="Add multiple users"
        icon="pi pi-users"
        severity="secondary"
        :pt="{ label: 'hidden sm:block' }"
        @click="showAddUserDialog"
      ></Button>
    </div>
    <div class="flex gap-2 items-center w-full">
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
        :pt="{ label: 'hidden sm:block' }"
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
      class="w-full"
    >
      <template #list="slotProps">
        <div v-for="user in slotProps.items" :key="user.id" class="p-3 border-b">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div class="flex flex-col flex-2">
              <div class="font-medium">{{ user.display }}</div>
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </div>
            <div class="flex-1 text-xs flex flex-row gap-3 items-right justify-end">
              <div class="mr-2 flex-1 sm:flex-0">
                Events
              </div>
              <PermissionDot
                v-for="action in permissionactions"
                :active="user.roles.includes(getPermissionName('event', action))" :permission="action"
              ></PermissionDot>
            </div>
            <div class="flex-1 text-sm flex flex-row gap-3 items-center justify-end">
              <div class="mr-2 flex-1 sm:flex-0">
                Users
              </div>
              <PermissionDot
                v-for="action in permissionactions"
                :active="user.roles.includes(getPermissionName('user', action))" :permission="action"
              ></PermissionDot>
            </div>
          </div>
          <!-- <div class="text-xs text-primary-600 mt-1">Roles: {{ user.roles.join(', ') }}</div> -->
        </div>
      </template>
    </DataView>
  </div>

  <Dialog v-model:visible="addUserDialogVisible" modal header="Add Users" :style="{ width: '50vw' }">
    <form @submit.prevent="addUser">
      <div class="flex flex-row gap-2 sm:flex-row mt-1">
        <FloatLabel variant="on" class="flex-1">
          <InputText id="email" v-model="email" class="w-full"/>
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="on" class="flex-1">
          <InputText id="name" v-model="name" class="w-full"/>
          <label for="name">Name</label>
        </FloatLabel>
        <Button icon class="pi pi-minus-circle">
        </Button>
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required>
        <label for="roles">Roles</label>
        <select id="roles" v-model="roles" multiple required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit" class="mt-2 bg-primary-500 text-white px-4 py-2 rounded">Add User</button>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { user } from './composables/useAuth';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useApi } from './composables/useApi';
import PermissionDot from './components/PermissionDot.vue';
// import { useToast } from 'primevue/usetoast';

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

const permissionactions = ["view", "edit", "create", "delete"]
const getPermissionName = (area, permission) => area + permission.charAt(0).toUpperCase() + permission.slice(1)

const addUserDialogVisible = ref(false);

const showAddUserDialog = () => {
  addUserDialogVisible.value = true;
}

</script>
