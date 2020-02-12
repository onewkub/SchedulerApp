export interface Task {
  taskID: number;
  projectID: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  ownerID: number;
  status: TaskStatus;
  reasonForCancel: string;
}

export enum TaskStatus {
  completed,
  canceled,
  inProgress,
  pending,
  late,
}
