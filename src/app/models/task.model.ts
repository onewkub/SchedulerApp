import { firestore } from 'firebase';

export interface Task {
  uid: string;
  name?: string;
  description?: string;
  startDate?: firestore.Timestamp;
  endDate?: firestore.Timestamp;
  owner?: string;
  status?: TaskStatus;
}

export enum TaskStatus {
  completed,
  canceled,
  inProgress,
  pending,
  late,
}
