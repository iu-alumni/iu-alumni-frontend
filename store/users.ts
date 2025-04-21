import { defineStore } from "pinia";
import usersInstance from '@/api/users'
import type { User } from "~/types";

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    bannedUsersIds: new Set() as Set<string>,
  }),

  getters: {
    isUserBanned: (state: any) => {
      return (userId: string) => state.bannedUsersIds.includes(userId)
    }
  },

  actions: {
    async updateUsers() {
      let bannedUsers
      [this.users, bannedUsers] = await Promise.all([usersInstance.listUsers(), usersInstance.listBannedUsers()])

      this.bannedUsersIds = new Set(bannedUsers.map(user => user.id))
    },

    getUserById (userId: string) {
      return usersInstance.getUserById(userId)
    },

    changeUserBanStatus (userId: string) {
      if (this.isUserBanned(userId)) {
        usersInstance.unbanUser(userId).then(() => this.bannedUsersIds.delete(userId))
      } else {
        usersInstance.banUser(userId).then(() => this.bannedUsersIds.add(userId))
      }
    },
  }
})