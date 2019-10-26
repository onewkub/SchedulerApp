import { User } from './user.model';

export class Project {
    projectID: number;
    projectName: string;
    startDate: Date;
    endDate: Date;
    projectOwner: number;
    members: number[];
}
