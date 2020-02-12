export interface Project {
  uid: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  manager?: string;
  member?: string[];
  description?: string;
}
