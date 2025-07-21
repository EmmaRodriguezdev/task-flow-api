import { GetTasks } from "@/application/usecases/tasks/GetTasks";

export class TaskService {
  constructor(private getTasks: GetTasks) {}
  async executeGetTasks() {
    return this.getTasks.execute();
  }
}
