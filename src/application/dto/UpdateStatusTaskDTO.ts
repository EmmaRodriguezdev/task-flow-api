import { TaskStatus } from "@/domain/enums/tasks";
import { ValidationError } from "@/shared/errors/ValidationError";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class UpdateStatusTaskDTO {
  toStatus: TaskStatus;
  constructor(data: { toStatus: TaskStatus }) {
    this.toStatus = data.toStatus;
  }

  static fromRequest(body: { toStatus: TaskStatus }): UpdateStatusTaskDTO {
    if (!body.toStatus) {
      throw new ValidationError(
        "El status es requerido",
        HttpStatusCodes.BAD_REQUEST
      );
    }

    if (!Object.values(TaskStatus).includes(body.toStatus)) {
      console.log('Entro')
      throw new ValidationError(
        `El estatus debe ser uno de los siguientes valores: ${Object.values(
          TaskStatus
        )}`,
        HttpStatusCodes.BAD_REQUEST
      );
    }

    return new UpdateStatusTaskDTO({
      toStatus: body.toStatus,
    });
  }
}
