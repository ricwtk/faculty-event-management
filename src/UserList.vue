<template>
  <div class="w-full flex flex-col items-center p-5 gap-2">
    <div class="bg-black w-full px-2 py-1 rounded text-xs flex flex-row items-center">
      <div class="flex-1 text-white">
        Logged in as {{ user ? user.display : "" }} ({{ user ? user.email : "" }})
      </div>
      <Button @click="logout" label="Log out" severity="secondary" :pt="{
        label: 'text-xs'
      }"></Button>
    </div>
    <div class="w-full flex gap-2">
      <Button
        label="Add users"
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
        <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">  -->
        <div class="flex flex-wrap gap-4 justify-center mb-2">
          <!-- <template v-for="x in 53">   -->
          <div v-for="user in slotProps.items" :key="user.id" class="p-3 border rounded w-80" style="border: 1px solid var(--p-inputtext-border-color)">
            <div class="flex flex-col items-stretch gap-2 overflow-auto">
              <div class="flex flex-row">
                <div class="flex flex-col flex-1">
                  <div class="font-medium">{{ user.display }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
                <div class="flex flex-row">
                  <Button @click="showEditUserDialog(user)" icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-plain"></Button>
                  <Button @click="confirmDeleteUser($event, user)" icon="pi pi-trash" class="p-button-rounded p-button-text p-button-plain"></Button>
                </div>
              </div>
              <div class="flex-1 text-xs flex flex-row gap-3">
                <div class="mr-2 flex-1">
                  Events
                </div>
                <PermissionDot
                  v-for="action in permissionactions"
                  :active="user.roles.includes(getPermissionName('event', action))" :permission="action"
                ></PermissionDot>
              </div>
              <div class="flex-1 text-sm flex flex-row gap-3">
                <div class="mr-2 flex-1">
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
          <!-- </template>   -->
        </div>
      </template>
    </DataView>
  </div>

  <ConfirmPopup class="m-2"/>

  <Dialog v-model:visible="addUserDialogVisible" modal header="Add Users" class="w-full m-20">
    <div class="flex flex-row gap-1 mt-3 first:mt-0 items-center" v-for="(newUser, newU) in newUsers">
      <div class="flex flex-col gap-1 sm:flex-row flex-1">
        <FloatLabel variant="on" class="flex-1">
          <InputText :id="`email${newU}`" v-model="newUser.email" class="w-full"/>
          <label :for="`email${newU}`">Email</label>
        </FloatLabel>
        <FloatLabel variant="on" class="flex-1">
          <InputText :id="`name${newU}`" v-model="newUser.name" class="w-full"/>
          <label :for="`name${newU}`">Name</label>
        </FloatLabel>
      </div>
      <Button
        icon="pi pi-minus"
        severity="secondary"
        @click="removeNewUserRow(newU)"
      ></Button>
    </div>
    <Button fluid class="mt-2" severity="secondary" @click="addNewUserRow"><i class="pi pi-plus"></i></Button>
    <div class="flex flex-col gap-2 flex-1 mt-2" v-for="area in ['event', 'user']">
      <span class="font-semibold">{{ area.charAt(0).toUpperCase() + area.slice(1) }}</span>
      <div class="flex flex-col sm:flex-row gap-2">
        <ToggleButton class="flex-1 cursor-pointer"
          v-for="action in permissionactions"
          v-model="newPermissions[getPermissionName(area, action)]"
        >
          <PermissionDot
            :active="newPermissions[getPermissionName(area, action)]" :permission="action"
          ></PermissionDot>
          <div class="">{{ action.charAt(0).toUpperCase() + action.slice(1) }}</div>
        </ToggleButton>
      </div>
    </div>

    <!-- <button type="submit" class="mt-2 bg-primary-500 text-white px-4 py-2 rounded">Add User</button> -->
    <div class="flex mt-2">
      <div class="flex-1 flex justify-end gap-2 mt-2">
        <Button type="button" label="Cancel" severity="secondary" @click="addUserDialogVisible=false"></Button>
        <Button type="submit" label="Save" @click="addUsers"></Button>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="editUserDialogVisible" modal header="Edit User" class="w-full m-20">
    <div class="flex flex-col gap-1 mt-1">
      <div class="flex flex-col gap-2 sm:gap-1 sm:flex-row flex-1">
        <FloatLabel variant="on" class="flex-1">
          <InputText disabled id="email" v-model="userToEdit.email" class="w-full" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="on" class="flex-1">
          <InputText id="display" v-model="userToEdit.display" class="w-full" />
          <label for="display">Display Name</label>
        </FloatLabel>
      </div>
      <div class="flex flex-col gap-0.5 flex-1 mt-2" v-for="area in ['event', 'user']">
        <span class="font-semibold">{{ area.charAt(0).toUpperCase() + area.slice(1) }}</span>
        <div class="flex flex-col sm:flex-row gap-1">
          <ToggleButton class="flex-1 cursor-pointer"
            v-for="action in permissionactions"
            v-model="userToEdit.permissions[getPermissionName(area, action)]"
          >
            <PermissionDot
              :active="userToEdit.permissions[getPermissionName(area, action)]" :permission="action"
            ></PermissionDot>
            <div class="">{{ action.charAt(0).toUpperCase() + action.slice(1) }}</div>
          </ToggleButton>
        </div>
      </div>
    </div>
    <div class="flex mt-2">
      <div class="flex-1 flex justify-end gap-2 mt-2">
        <Button type="button" label="Cancel" severity="secondary" @click="editUserDialogVisible=false"></Button>
        <Button type="submit" label="Save" @click="editUser"></Button>
      </div>
    </div>
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
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();

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

// users creation
const addUserDialogVisible = ref(false);
const showAddUserDialog = () => {
  addUserDialogVisible.value = true;
}
const newUsers = ref([{
  email: "",
  name: ""
}])
const resetNewUsers = () => {
  newUsers.value = [{
    email: "",
    name: ""
  }]
}
const addNewUserRow = () => {
  newUsers.value.push({
    email: "",
    name: ""
  })
}
const removeNewUserRow = (r) => {
  newUsers.value.splice(r, 1)
}
const newPermissions = ref(["event", "user"].reduce((a, c) => {
  permissionactions.reduce((acc, curr) => {
    acc[getPermissionName(c, curr)] = false
    return acc
  }, a)
  return a
}, {}))
const resetNewPermissions = () => {
  newPermissions.value = ["event", "user"].reduce((a, c) => {
    permissionactions.reduce((acc, curr) => {
      acc[getPermissionName(c, curr)] = false
      return acc
    }, a)
    return a
  }, {})
}
const addUsers = () => {
  addUserDialogVisible.value = false;
  newUsers.value = newUsers.value.filter(user => user.email !== "")
  let newUserList = newUsers.value.map(user => ({
    email: user.email,
    display: user.name,
    roles: Object.keys(newPermissions.value).reduce((acc, curr) => {
      if (newPermissions.value[curr]) {
        acc.push(curr)
      }
      return acc
    }, [])
  }))

  console.debug(newUserList)
  console.debug(newPermissions.value)
  resetNewUsers()
  resetNewPermissions()

  return saveUsersToDb(newUserList)
}

// edit user
const editUserDialogVisible = ref(false);
const userToEdit = ref({
  id: "",
  email: "",
  display: "",
  permissions: ["event", "user"].reduce((a, c) => {
    permissionactions.reduce((acc, curr) => {
      acc[getPermissionName(c, curr)] = false
      return acc
    }, a)
    return a
  }, {})
})
const showEditUserDialog = (user) => {
  editUserDialogVisible.value = true;
  userToEdit.value = {
    ...user,
    permissions: user.roles.reduce((acc, curr) => {
      acc[curr] = true
      return acc
    }, {})
  }
}
const editUser = () => {
  console.log(userToEdit.value)
  userToEdit.value.roles = Object.keys(userToEdit.value.permissions).reduce((acc, curr) => {
    if (userToEdit.value.permissions[curr]) {
      acc.push(curr)
    }
    return acc
  }, [])
  return saveUsersToDb([{
    id: userToEdit.value.id,
    email: userToEdit.value.email,
    display: userToEdit.value.display,
    roles: userToEdit.value.roles
  }])
}
const saveUsersToDb = (users) => {
  return useApi("/updateUsers", {
    method: "POST",
    body: JSON.stringify(users)
  }).then(() => {
    console.log('Users saved successfully')
    loadUsers({ first: 0, rows: rows.value })
  })
}
// delete user
const confirmDeleteUser = (ev, user) => {
  confirm.require({
    target: ev.currentTarget,
    message: `Are you sure you want to delete this user with email ${user.email}?`,
    // header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    reject: () => {
      console.log('User deletion cancelled')
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
      outlined: true
    },
    accept: () => {
      deleteUser(user.id)
    },
  });
}
const deleteUser = (id) => {
  console.log(id)
}
</script>
