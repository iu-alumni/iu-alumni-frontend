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
      return (userId: string) => state.bannedUsersIds.has(userId)
    }
  },

  actions: {
    async updateUsers() {
      let allUsers, bannedUsers
      [allUsers, bannedUsers] = await Promise.all([usersInstance.listUsers().then(), usersInstance.listBannedUsers()])

      this.bannedUsersIds = new Set(bannedUsers.map(user => user.id))
      this.users = allUsers.map(user => {
        user.name = user.name ? user.name : user.first_name + ' ' + user.last_name
        user.email = user.first_name.charAt(0).toLowerCase() + '.' + user.last_name.toLowerCase() + "@innopolis.university" // TODO ask Ahmad to add emails to profiles
        return user
      })
    },

    getUserById (userId: string) {
      return usersInstance.getUserById(userId).then(user => {
        user.name = user.name ? user.name : user.first_name + ' ' + user.last_name
        user.email = user.first_name.charAt(0).toLowerCase() + '.' + user.last_name.toLowerCase() + "@innopolis.university" // TODO ask Ahmad to add emails to profiles
        return user
      })
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