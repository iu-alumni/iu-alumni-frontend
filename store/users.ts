import { defineStore } from "pinia";
import usersInstance from '@/api/users'
import type { User } from "~/types";

interface UsersState {
  users: User[];
  bannedUsersIds: Set<string>;
  verifiedUsersIds: Set<string>;
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [] as User[],
    bannedUsersIds: new Set() as Set<string>,
    verifiedUsersIds: new Set() as Set<string>,
  }),

  getters: {
    isUserBanned: (state: UsersState) => {
      return (userId: string) => state.bannedUsersIds.has(userId)
    },
    isUserVerified: (state: UsersState) => {
      return (userId: string) => state.verifiedUsersIds.has(userId)
    }
  },

  actions: {
    async updateUsers(params?: { banned?: boolean | null, verified?: boolean | null }) {
      try {
        const [allUsers, bannedUsers] = await Promise.all([
          usersInstance.listUsers(params),
          usersInstance.listBannedUsers()
        ]);

        this.bannedUsersIds = new Set(bannedUsers.map(user => user.id));
        this.verifiedUsersIds = new Set(
          allUsers.filter(user => user.is_verified).map(user => user.id)
        );

        this.users = allUsers.map(user => ({
          ...user,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email || `${user.first_name.charAt(0).toLowerCase()}.${user.last_name.toLowerCase()}@innopolis.university`,
          isBanned: user.is_banned,
          isVerified: user.is_verified
        }));
      } catch (error) {
        console.error('Failed to update users:', error);
        throw error;
      }
    },

    async getUserById (userId: string) {
      return usersInstance.getUserById(userId).then(user => {
        user.name = user.first_name + ' ' + user.last_name
        user.email = user.first_name.charAt(0).toLowerCase() + '.' + user.last_name.toLowerCase() + "@innopolis.university" // TODO ask Ahmad to add emails to profiles
        return user
      })
    },

    async changeUserBanStatus(userId: string) {
      try {
        if (this.isUserBanned(userId)) {
          await usersInstance.unbanUser(userId);
          this.bannedUsersIds.delete(userId);
          const user = this.users.find(u => u.id === userId);
          if (user) user.is_banned = false;
        } else {
          await usersInstance.banUser(userId);
          this.bannedUsersIds.add(userId);
          const user = this.users.find(u => u.id === userId);
          if (user) user.is_banned = true;
        }
      } catch (error) {
        console.error('Failed to change user ban status:', error);
        throw error;
      }
    },

    async changeUserVerificationStatus(userId: string) {
      try {
        const user = this.users.find(u => u.id === userId);
        if (!user || !user.email) {
          console.error('User not found or missing email');
          return;
        }

        if (user.is_verified) {
          await usersInstance.unverifyUser(user.email);
          this.verifiedUsersIds.delete(userId);
          user.is_verified = false;
        } else {
          await usersInstance.verifyUser(user.email);
          this.verifiedUsersIds.add(userId);
          user.is_verified = true;
        }
      } catch (error) {
        console.error('Failed to change user verification status:', error);
        throw error;
      }
    },
  }
})