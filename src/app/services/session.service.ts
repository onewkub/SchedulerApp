import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Use this to store semi-persistent data
export class SessionService {
  selectedProjectID: number;
  activePage: number;

  constructor() {
    this.selectedProjectID = null;
    this.activePage = PageType.project;
  }
}

export enum PageType {
  dashboard,
  project,
}
