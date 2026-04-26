import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  allProjects: Project[] = [];
  newProject: Partial<Project> = {};
  selectedProject: Project | null = null;
  imageFile!: File;
  searchTitle: string = '';
  foundProject: Project | null = null;
  filteredProjects: Project[] = [];
  showForm = false;
  isAdmin = localStorage.getItem('portfolio_admin') === 'admin123';

  constructor(private projectService: ProjectService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

getAllProjects() {
  this.projectService.getAllProjects().subscribe({
    next: (projects) => {
      this.allProjects = projects;
      this.filteredProjects = projects; 
    },
    error: (err) => console.error('Erreur chargement projets', err)
  });
}

  getProjectByTitle(title: string) {
    this.projectService.getProjectByTitle(title).subscribe({
      next: (project) => this.allProjects = [project],
      error: () => this.allProjects = []
    });
  }
  filterProjects() {
  if (!this.searchTitle.trim()) {
    this.filteredProjects = this.allProjects;
    return;
  }
  this.filteredProjects = this.allProjects.filter(p =>
    p.title.toLowerCase().includes(this.searchTitle.toLowerCase())
  );
}

  deleteProject(idProject: number) {
    if (!confirm('Supprimer ce projet ?')) return;
    this.projectService.deleteProject(idProject).subscribe({
      next: () => this.getAllProjects(),
      error: (err) => console.error('Erreur suppression', err)
    });
  }

  selectForEdit(project: Project) {
    this.selectedProject = { ...project };
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.imageFile = input.files[0];
  }
getTechs(technologies: string | undefined): string[] {
  if (!technologies) return [];
  return technologies.split(',');
}
 createProject() {
  this.projectService.createProject(
    this.newProject.title!, this.newProject.description!,
    this.newProject.technologies!, this.newProject.githubLink!,
    this.newProject.demoLink!, this.newProject.ordre!,
    this.newProject.creationDate!, this.imageFile
  ).subscribe({
    next: () => {
      this.getAllProjects();
      this.newProject = {};
      this.showForm = false; // ← ferme le formulaire
    },
    error: (err) => console.error('Erreur création', err)
  });
}

  updateProject() {
    this.projectService.updateProject(
      this.selectedProject!.idProject,
      this.selectedProject!.title, this.selectedProject!.description,
      this.selectedProject!.technologies, this.selectedProject!.githubLink,
      this.selectedProject!.demoLink, this.selectedProject!.ordre,
      this.selectedProject!.creationDate, this.imageFile
    ).subscribe({
      next: () => { this.getAllProjects(); this.selectedProject = null; },
      error: (err) => console.error('Erreur modification', err)
    });
  }
  closeModal(event: MouseEvent) {
  
  if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
    this.selectedProject = null;
  }
}

isVideo(link: string | undefined): boolean {
  if (!link) return false;
  return (
    link.endsWith('.mp4') ||
    link.endsWith('.webm') ||
    link.endsWith('.ogg')
  );
}

isIframe(link: string | undefined): boolean {
  if (!link) return false;
  return (
    link.includes('youtube.com/embed') ||
    link.includes('player.vimeo.com') ||
    link.includes('embed')
  );
}

getSafeUrl(url: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}