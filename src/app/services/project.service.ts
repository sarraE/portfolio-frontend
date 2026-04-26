import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

   readonly apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllProjects():  Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.apiUrl}/getAllProjects`);
  }

  getProjectByTitle(title : string): Observable<Project> {
    return this.httpClient.get<Project>(`${this.apiUrl}/getProjectById/${title}`);
  }

  deleteProject(idProject : number) : Observable<void> {

    return this.httpClient.delete<void>(`${this.apiUrl}/deleteProject/${idProject}`);
  }

  createProject(title : string ,description : string,technologies : string,githubLink : string,demoLink : string,ordre : number,creationDate : string, image: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('technologies', technologies);
    formData.append('githubLink', githubLink);
    formData.append('demoLink', demoLink);
    formData.append('ordre', ordre.toString());
    formData.append('creationDate', creationDate);
    return this.httpClient.post(`${this.apiUrl}/createProject`, formData);
    }

  updateProject(idProject: number, title : string ,description : string,technologies : string,githubLink : string,demoLink : string,ordre : number,creationDate : string, image: File) : Observable<any>{
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('technologies', technologies);
    formData.append('githubLink', githubLink);
    formData.append('demoLink', demoLink);
    formData.append('ordre', ordre.toString());
    formData.append('creationDate', creationDate);
    return this.httpClient.put(`${this.apiUrl}/updateProject/${idProject}`, formData);
    }

  
}
