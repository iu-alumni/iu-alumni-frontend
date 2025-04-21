import type { User } from "~/types";
import axiosInstance from ".";

function listUsers (): Promise<User[]> {
  return axiosInstance.get('profile/all')
}

function getUserById (userId: string): Promise<User> {
  return axiosInstance.get(`profile/${userId}`)
}

function listBannedUsers (): Promise<User[]> {
  return axiosInstance.get('admin/banned')
}

function banUser (userId: string): Promise<User> {
  return axiosInstance.get(`admin/ban/${userId}`)
}

function unbanUser (userId: string): Promise<User> {
  return axiosInstance.get(`admin/unban/${userId}`)
}

export default {
  listUsers,
  getUserById,
  listBannedUsers,
  banUser,
  unbanUser,
}
