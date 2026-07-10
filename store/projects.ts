import { defineStore } from "pinia";
import projectsInstance from "~/api/projects";
import type { ProjectListItem, ProjectStatusFilter } from "~/types";

interface ListParams {
    status?: ProjectStatusFilter;
    search?: string;
    cursor?: string;
    limit?: number;
}

export const useProjectsStore = defineStore("projects", {
    state: () => ({
        projects: [] as ProjectListItem[],
        nextCursor: null as string | null,
        status: "all" as ProjectStatusFilter,
        search: "" as string,
    }),

    getters: {
        getProjectById: (state) => (projectId: string) =>
            state.projects.find((p) => p.id === projectId),
    },

    actions: {
        async fetchProjects (params?: ListParams) {
            const effective = {
                status: params?.status ?? this.status,
                search:
                    (params?.search === undefined
                        ? this.search
                        : params.search) || undefined,
                cursor: params?.cursor,
                limit: params?.limit ?? 50,
            };
            const page = await projectsInstance.adminListProjects(effective);
            this.projects = page.items;
            this.nextCursor = page.next_cursor;
        },

        async loadMore () {
            if (!this.nextCursor) return;
            const page = await projectsInstance.adminListProjects({
                status: this.status,
                search: this.search || undefined,
                cursor: this.nextCursor,
            });
            this.projects = [...this.projects, ...page.items];
            this.nextCursor = page.next_cursor;
        },

        setStatus (status: ProjectStatusFilter) {
            this.status = status;
        },

        setSearch (search: string) {
            this.search = search;
        },

        async approve (projectId: string) {
            await projectsInstance.approveProject(projectId);
            await this.fetchProjects();
        },

        async decline (projectId: string) {
            await projectsInstance.declineProject(projectId);
            await this.fetchProjects();
        },

        async unapprove (projectId: string) {
            await projectsInstance.unapproveProject(projectId);
            await this.fetchProjects();
        },

        async remove (projectId: string) {
            await projectsInstance.deleteProject(projectId);
            const idx = this.projects.findIndex((p) => p.id === projectId);
            if (idx !== -1) this.projects.splice(idx, 1);
        },
    },
});
