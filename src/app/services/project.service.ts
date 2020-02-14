import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectURL = 'projects';

  constructor(
    private firestore: AngularFirestore
  ) { }

  addProject(project: Project) {
    const ref =  this.firestore.collection<Project>(this.projectURL).add(project);
    ref.then(newRef => {
      const uid: Project = {
        uid: newRef.id,
      };
      newRef.update(uid);
    });
  }

  getProject(uid: string): Observable<Project> {
    return this.firestore.doc<Project>(`${this.projectURL}/${uid}`).valueChanges();
  }

  getUserProjects(uid: string): Observable<Project[]> {
    return this.firestore.collection<Project>(this.projectURL, ref =>
      ref.where('member', 'array-contains', `${uid}`)).valueChanges();
  }

  getTasks(uid: string): Observable<string[]> {
    return this.firestore.doc<Project>(`${this.projectURL}/${uid}`).valueChanges()
      .pipe(map(project => project.member));
  }

  updateProject(project: Project): Promise<void> {
    const ref = this.firestore.doc<Project>(`${this.projectURL}/${project.uid}`);
    return ref.set(project, { merge: true });
  }

  deleteProject(uid: string): Promise<void> {
    const ref = this.firestore.doc<Project>(`${this.projectURL}/${uid}`);
    return ref.delete();
  }
}
