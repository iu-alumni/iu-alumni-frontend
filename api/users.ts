import type { User, UserProfile } from "~/types";
import axiosInstance from ".";

interface ListUsersParams {
  banned?: boolean | null;
  verified?: boolean | null;
}

function listUsers(params?: ListUsersParams): Promise<User[]> {
  return axiosInstance.get('/admin/users', { params }).then(req => req.data)
}

function getUserById (userId: string): Promise<UserProfile> {
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

interface VerifyUserParams {
  email: string;
}

function verifyUser (email: string): Promise<User> {
  return axiosInstance.post('admin/verify', { email }).then(req => req.data)
}

function unverifyUser (email: string): Promise<User> {
  return axiosInstance.post('admin/unverify', { email }).then(req => req.data)
}

function uploadAllowedEmailsXls (file: File): Promise<{success: true, message: string}> {
  const formData = new FormData();
  formData.append("file", file);

  const response = axiosInstance.post("/admin/upload-allowed-emails", formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });

  return response.then(res => res.data);
}

export default {
  listUsers,
  getUserById,
  listBannedUsers,
  banUser,
  unbanUser,
  verifyUser,
  unverifyUser,
  uploadAllowedEmailsXls
}
