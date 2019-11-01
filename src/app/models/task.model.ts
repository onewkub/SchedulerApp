export class Task {
  taskID: number;
  projectID: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  owner: number;
  status: TaskStatus;
  reasonForCancel = '';
}

export enum TaskStatus {
  completed,
  canceled,
  inProgress,
  pending,
  late,
}
