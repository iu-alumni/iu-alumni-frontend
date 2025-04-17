import { defineStore } from "pinia";
import { testUsers } from "~/tests/data";
import type { User } from "~/types";

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: testUsers as User[]
  }),
})