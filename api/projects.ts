import type {
    Paginated,
    Project,
    ProjectListItem,
    ProjectStatusFilter,
} from "~/types";
import axiosInstance from ".";

interface AdminListParams {
    status?: ProjectStatusFilter;
    search?: string;
    cursor?: string;
    limit?: number;
}

function adminListProjects (params?: AdminListParams): Promise<Paginated<ProjectListItem>> {
    return axiosInstance
        .get("api/v1/admin/projects", { params })
        .then((r) => r.data);
}

function getProjectCover (projectId: string): Promise<{ cover: string | null }> {
    return axiosInstance
        .get(`api/v1/projects/${projectId}/cover`)
        .then((r) => r.data);
}

function approveProject (projectId: string): Promise<Project> {
    return axiosInstance
        .post(`api/v1/admin/projects/approve/${projectId}`)
        .then((r) => r.data);
}

function declineProject (projectId: string): Promise<Project> {
    return axiosInstance
        .post(`api/v1/admin/projects/decline/${projectId}`)
        .then((r) => r.data);
}

function unapproveProject (projectId: string): Promise<Project> {
    return axiosInstance
        .post(`api/v1/admin/projects/unapprove/${projectId}`)
        .then((r) => r.data);
}

function deleteProject (projectId: string): Promise<unknown> {
    return axiosInstance
        .delete(`api/v1/projects/${projectId}`)
        .then((r) => r.data);
}

export default {
    adminListProjects,
    getProjectCover,
    approveProject,
    declineProject,
    unapproveProject,
    deleteProject,
};
