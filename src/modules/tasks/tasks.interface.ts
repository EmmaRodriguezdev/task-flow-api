
export interface TasksAttributes {
    title: string;
    description?: string | null;
    assignedTo?: number | null;
    workspaceId: number;
    parentId?: number | null;
}

export interface SuccessMessage {
    message: string;
    status: number;
}