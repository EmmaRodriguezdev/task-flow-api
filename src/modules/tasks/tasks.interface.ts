
export interface TasksAttributes {
    title: string;
    description?: string | null;
    assignedTo?: number | null;
    workspaceId: number;
    parentId?: number | null;
}