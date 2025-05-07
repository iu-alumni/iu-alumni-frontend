import type { User } from "~/types";
import axiosInstance from ".";

function listUsers (): Promise<User[]> {
  return axiosInstance.get('profile/all').then(req => req.data)
}

function getUserById (userId: string): Promise<User> {
  return axiosInstance.get(`profile/${userId}`).then(req => req.data)
}

function listBannedUsers (): Promise<User[]> {
  return axiosInstance.get('admin/banned').then(req => req.data)
}

function banUser (userId: string): Promise<User> {
  return axiosInstance.post(`admin/ban/${userId}`).then(req => req.data)
}

function unbanUser (userId: string): Promise<User> {
  return axiosInstance.post(`admin/unban/${userId}`).then(req => req.data)
}

export default {
  listUsers,
  getUserById,
  listBannedUsers,
  banUser,
  unbanUser,
}
