import type { User, UserListItem, UserProfile, Paginated } from "~/types";
import axiosInstance from ".";

interface ListUsersParams {
  search?: string;
  banned?: boolean | null;
  verified?: boolean | null;
  cursor?: string;
  limit?: number;
}

function listUsers(params?: ListUsersParams): Promise<Paginated<UserListItem>> {
  return axiosInstance.get('/api/v1/admin/users', { params }).then(req => req.data)
}

function getUserAvatar (userId: string): Promise<{ avatar: string | null }> {
  return axiosInstance.get(`api/v1/profile/${userId}/avatar`).then(req => req.data)
}

function getUserById (userId: string): Promise<UserProfile> {
  return axiosInstance.get(`api/v1/profile/${userId}`).then(req => req.data)
}

function listBannedUsers (): Promise<User[]> {
  return axiosInstance.get('api/v1/admin/banned').then(req => req.data)
}

function banUser (userId: string): Promise<User> {
  return axiosInstance.post(`api/v1/admin/ban/${userId}`).then(req => req.data)
}

function unbanUser (userId: string): Promise<User> {
  return axiosInstance.post(`api/v1/admin/unban/${userId}`).then(req => req.data)
}

function verifyUser (email: string): Promise<User> {
  return axiosInstance.post('api/v1/admin/verify', { email }).then(req => req.data)
}

function unverifyUser (email: string): Promise<User> {
  return axiosInstance.post('api/v1/admin/unverify', { email }).then(req => req.data)
}

function uploadAllowedEmailsXls (file: File): Promise<{success: true, message: string}> {
  const formData = new FormData();
  formData.append("file", file);

  const response = axiosInstance.post("/api/v1/admin/upload-allowed-emails", formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });

  return response.then(res => res.data);
}

export default {
  listUsers,
  getUserAvatar,
  getUserById,
  listBannedUsers,
  banUser,
  unbanUser,
  verifyUser,
  unverifyUser,
  uploadAllowedEmailsXls
}
