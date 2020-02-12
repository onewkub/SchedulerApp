export interface Project {
  uid: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  manager?: number;
  member?: number[];
  description?: string;
}
