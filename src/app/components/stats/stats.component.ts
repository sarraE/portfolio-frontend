import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatService } from '../../services/stat.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {

  visitorCount: number = 0;

  constructor(private statService: StatService) {}

  ngOnInit(): void {
    this.recordVisit();
    this.getCount();
  }

  recordVisit() {
    this.statService.recordVisit('accueil').subscribe({
      next: () => console.log('visit recorded'),
      error: (err) => console.error(err)
    });
  }

  getCount() {
    this.statService.getCount('accueil').subscribe({
      next: (count) => this.visitorCount = count,
      error: (err) => console.error(err)
    });
  }
}