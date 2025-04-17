import axiosInstance from ".";

export function auth (email: string, password: string) {
  return axiosInstance.post('auth/login', {email, password})
}
