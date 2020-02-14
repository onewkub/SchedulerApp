import { firestore } from 'firebase';

export interface Project {
  uid: string;
  name?: string;
  startDate?: firestore.Timestamp;
  endDate?: firestore.Timestamp;
  manager?: string;
  member?: string[];
  tasks?: string[];
  description?: string;
}
