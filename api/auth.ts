import { useToast } from "~/components/ui/toast/use-toast";
import axiosInstance from ".";

export function serverLogin(email: string, password: string) {
    return axiosInstance.post("auth/login", { email, password });
}

export async function uploadAlumniXls(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/auth/import-alumni", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export async function uploadAlumniEmailsXls(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/admin/upload-allowed-emails", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful (status code 2xx), just return it
        return response;
    },
    (error) => {
        const { toast } = useToast();
        if (error.response) {
            console.error(
                "API Error:",
                error.response.status,
                error.response.data,
            );
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    error.response.data?.detail ||
                    `Request failed with status code ${error.response.status}` ||
                    "An unexpected error occurred.",
            });
        } else if (error.request) {
            console.error("No response received:", error.request);
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    "The server did not respond. Please check your network connection.",
            });
        } else {
            console.error("Request setup error:", error.message);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred while setting up the request.",
            });
        }

        return Promise.reject(error);
    },
);
